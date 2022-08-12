import everything from './build/Everything';

const name = everything
  .string('thomas')
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

console.log(name)