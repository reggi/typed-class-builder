import fs from 'node:fs/promises' 
import path from 'node:path' 
import { Classes, entrypoint, everyTypeClass, Method } from './utils'
import { Project, SyntaxKind } from "ts-morph";


const everyClassNameMap = {
  'string': 'EveryString',
  'number': 'EveryNumber',
  'Date': 'EveryDate',
  'string[]': 'EveryStringArray',
  'number[]': 'EveryNumberArray',
  'Date[]': 'EveryDateArray',
}

const everyClassNameLookup = (type: string) => {
  if (everyClassNameMap[type]) return everyClassNameMap[type];
  return undefined;
}

const project = new Project();

const source = "./example.ts";
const sourceFile = project.addSourceFileAtPath(source);

const groupedMethods: {[key: string]: Method[]} = {};

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

sourceFile.getChildrenOfKind(SyntaxKind.FunctionDeclaration).forEach(exported => {
  const functionName = exported.getName()
  if (!functionName) return;

  const parameters = exported.getParameters().map(param => {
    return {
      name: param.getName(),
      type: param.getType().getText()
    }
  })
  
  const firstParam = parameters.shift();
  if (!firstParam) return;

  const returnType = exported.getReturnType().getText();
  const isGetter = parameters.length === 0

  const returnClass = everyClassNameLookup(returnType);

  if (!returnClass) return;

  const input = firstParam?.type

  const leadedParams = [{name: 'current', type: firstParam.type }, ...parameters];

  const results: Method = {
    input,
    output: returnType,
    methodName: functionName.split("_")[1],
    functionName,
    typedArguments: parameters.map(param => `${param.name}: ${param.type}`).join(", "),
    calledArguments: leadedParams.map(param => `${param.name}`).join(", "),
    isGetter,
    returnClass,
    methodPrefix: isGetter ? 'get ' : '',
    isTypedName: firstParam.name === '_'
  }
  
  if (!groupedMethods[input]) groupedMethods[input] = [];
  groupedMethods[input].push(results)
});

const classes: Classes[] = []

Object.entries(groupedMethods).forEach(([key, methods]) => {
  const className = everyClassNameLookup(key)
  const returnType = key;
  const dep = path.join('..', source).replace(/.ts/g, '');
  const options = {className, returnType, dep}

  const imports = methods
    .map(m => m.returnClass)
    .filter(returnClass => returnClass !== className)
    .filter(unique)
    .map(returnClass => ({ returnClass }));
  const filecontent = everyTypeClass(options, methods, imports);

  // this is the method that represents the type entrypoint
  const typedMethod = methods.find(method => method.isTypedName)
  if (typedMethod) {
    classes.push({
      className,
      returnTypeName: typedMethod.methodName,
      returnType: typedMethod.output
    })
  }

  fs.writeFile(`./build/${className}.ts`, filecontent, { encoding: 'utf8' })
})

fs.writeFile(`./build/Everything.ts`, entrypoint(classes), { encoding: 'utf8' })