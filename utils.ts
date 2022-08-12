export interface Method {
  input: string
  output: string
  methodName: string
  functionName: string,
  typedArguments: string,
  calledArguments: string,
  isGetter: boolean,
  returnClass: string,
  methodPrefix: string,
  isTypedName: boolean
}

interface Options {
  className: string,
  returnType: string,
  dep: string
}

interface Imports {
  returnClass: string
}

const importDeps = (methods: Method[]) => {
  return methods.map(({ functionName }) => {
    return `  ${functionName}`;
  }).join(',\n').trim()
}

export const everyTypeClass = (options: Options, methods: Method[], imports: Imports[]) => `
import Every from "./Every";
import {
  ${importDeps(methods)}
} from "${options.dep}";
${imports.map(({ returnClass }) => {
  return `import ${returnClass} from "./${returnClass}";`
}).join('\n')}

export default class ${options.className} extends Every<${options.returnType}> {
  ${methods.filter(({ isTypedName }) => isTypedName).map(method => {
    const { returnClass, methodName } = method;
    return `
  static ${methodName}(value: ${options.returnType}) {
    return new ${returnClass}().${methodName}(value);
  }\n`.trim()
  })}
  ${methods.map(method => {
    const { returnClass, methodName, calledArguments, functionName, typedArguments, methodPrefix } = method;
    return `
  ${methodPrefix}${methodName}(${typedArguments}) {
    const current = this.value;
    const result = ${functionName}(${calledArguments});
    this.state.history.push(result);
    return new ${returnClass}(this.state);
  }\n`.trim()
  }).join('\n  ')}
}
`

export interface Classes {
  className: string,
  returnTypeName: string,
  returnType: string
}

export const entrypoint = (classes: Classes[]) => `
import { State } from "./State"
${classes.map(c => {
  return `import ${c.className} from "./${c.className}";`
}).join('\n')}

export class Everything {
  state: State
  constructor() {
    this.state = new State()
  }

  ${classes.map(c => {
    return `
  ${c.returnTypeName} (value: ${c.returnType}) {
    return new ${c.className}(this.state).${c.returnTypeName}(value)
  }\n`.trim()
  }).join('\n  ')}
}

const everything = new Everything()

export default everything;
`
