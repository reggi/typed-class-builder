# Typed Class Builder

This project is a demo that shows off an idea.

Is it possible to take a typescript file of functions with specific input and output types, and build these into a class where all the values connect?

Here's an example of the builer class you have when you run the build.

```ts
import everything from './build/Everything';

const name = everything
  .string('thomas')
  .length
  .alphaNumber // 76
  .letter // d
  .uppercase // D
  .alphaNumber // 4
  .add(4) // 8
  .length // 1
  .half // 0.5
  .add(.5) // 1
  .letter // a
  .concat(' hello world') // a hello world
  .concat("123") // a hello world123
  .alphaOnly // ahelloworld
  .alphaNumber // 125
  .value

console.log(name) // 125
```

The following command will build the builder from the functions in `example.ts`.

```
npm run build
```

The following command will run the above script printing `125`

```
npm run start
```