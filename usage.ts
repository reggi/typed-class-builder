import everything from './build/Everything';

const name = everything
  .string('thomas')
  .snap('name')
  .sidechain('length', c => c
    .length
    .letter
    .snap('helloworld')
  )
  .alphaNumber // 76
  .snap('alphaNumber')
  .letter // d
  .uppercase // D
  .alphaNumber // 4
  .add(4) // 8
  .length // 1
  .half // 0.5
  .sidechain(v => v
    .add(2)
    .snap('bonkers')
  )
  .add(.5) // 1
  .letter // a
  .concat(' hello world') // a hello world
  .concat("123") // a hello world123
  .alphaOnly // ahelloworld
  .alphaNumber // 125
  

console.log(name.value)
console.log(name.snaps)