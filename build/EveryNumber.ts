
import Every from "./Every";
import {
  number_number,
  number_validate,
  number_length,
  number_add,
  number_subtractFrom,
  number_subtract,
  number_half,
  number_letter
} from "../example";
import EveryString from "./EveryString";

export default class EveryNumber extends Every<number> {
  static number(value: number) {
    return new EveryNumber().number(value);
  }
  number(value: number) {
    const current = this.value;
    const result = number_number(current, value);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  get validate() {
    const current = this.value;
    const result = number_validate(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  get length() {
    const current = this.value;
    const result = number_length(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  add(addend: number) {
    const current = this.value;
    const result = number_add(current, addend);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  subtractFrom(subtrahend: number) {
    const current = this.value;
    const result = number_subtractFrom(current, subtrahend);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  subtract(minuend: number) {
    const current = this.value;
    const result = number_subtract(current, minuend);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  get half() {
    const current = this.value;
    const result = number_half(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  get letter() {
    const current = this.value;
    const result = number_letter(current);
    this.state.history.push(result);
    return new EveryString(this.state);
  }
}
