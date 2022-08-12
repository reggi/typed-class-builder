// creation types

export function string_string (_: string, value: string): string {
  return value
}

export function number_number (_: number, value: number): number {
  return value
}

export function date_date (_: Date, value: Date): Date {
  return value
}

// string types

export function string_uppercase (value: string): string {
  return value.toUpperCase()
}

export function string_lowercase (value: string): string {
  return value.toLowerCase()
}

export function string_numbers (value: string): number[] {
  return value
    .split('')
    .filter(v => v.match(/\d/))
    .map(v => parseInt(v))
}

export function string_split (value: string, delimeter = ""): string[] {
  return value.split(delimeter)
}

export function string_alphaOnly (value: string): string {
  return value.split('').filter(v => v.match(/[a-zA-Z]/)).join('')
}

// validate

export function string_validate (value: string): string {
  if (typeof value === 'string') return value;
  throw new Error('Invalid string')
}

export function number_validate (value: number): number {
  if (typeof value === 'number') return value;
  throw new Error('Invalid number')
}

export function date_validate (value: Date): Date {
  if (value instanceof Date) return value;
  throw new Error('Invalid date')
}

export function strings_validate (value: string[]): string[] {
  try {
    value.map(v => string_validate(v));
    return value
  } catch {
    throw new Error('Invalid string array')
  }
}

export function numbers_validate (value: number[]): number[] {
  try {
    value.map(v => number_validate(v));
    return value
  } catch {
    throw new Error('Invalid number array')
  }
}

export function dates_validate (value: Date[]): Date[] {
  try {
    value.map(v => date_validate(v));
    return value
  } catch {
    throw new Error('Invalid date array')
  }
}

// length

export function string_length (value: string): number {
  return value.length
}

export function number_length (value: number): number {
  return value.toString().length
}

export function date_length (value: Date): number {
  return value.getTime()
}

export function strings_length (value: string[]): number {
  return value.length  
}

export function numbers_length (value: number[]): number {
  return value.length  
}

export function dates_length (value: Date[]): number {
  return value.length  
}

// number

export function number_add (value: number, addend: number): number {
  return value + addend
}

export function number_subtractFrom (value: number, subtrahend: number): number {
  return value - subtrahend
}

export function number_subtract (value: number, minuend: number): number {
  return minuend - value
}

export function number_half (value: number): number {
  return value / 2
}

// numbers

export function numbers_add (value: number[]): number {
  return value.reduce((partialSum: number, a: number) => partialSum + a, 0);
}

export function number_letter (value: number): string {
  const remainder = value % 24
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return letters[remainder-1]
}

export function strings_alphaNumber (value: string[]): number {
  return numbers_add(value.map(string_alphaNumber))
}

export function string_alphaNumber (value: string): number {
  if (value.length !== 1) return strings_alphaNumber(string_alphaOnly(value).split(''))
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const index = letters.indexOf(value.toLowerCase())
  if (index === -1) return 0
  return index + 1
}

export function string_concat (value: string, concat: string): string {
  return value + concat
}