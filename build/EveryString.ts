
import Every from "./Every";
import {
  string_string,
  string_uppercase,
  string_lowercase,
  string_numbers,
  string_split,
  string_alphaOnly,
  string_validate,
  string_length,
  string_alphaNumber,
  string_concat
} from "../example";
import EveryNumberArray from "./EveryNumberArray";
import EveryStringArray from "./EveryStringArray";
import EveryNumber from "./EveryNumber";

export default class EveryString extends Every<string> {
  string(value: string) {
    const current = this.value;
    const result = string_string(current, value);
    this.state.history.push(result);
    return new EveryString(this.state);
  }
  get uppercase() {
    const current = this.value;
    const result = string_uppercase(current);
    this.state.history.push(result);
    return new EveryString(this.state);
  }
  get lowercase() {
    const current = this.value;
    const result = string_lowercase(current);
    this.state.history.push(result);
    return new EveryString(this.state);
  }
  get numbers() {
    const current = this.value;
    const result = string_numbers(current);
    this.state.history.push(result);
    return new EveryNumberArray(this.state);
  }
  split(delimeter: string) {
    const current = this.value;
    const result = string_split(current, delimeter);
    this.state.history.push(result);
    return new EveryStringArray(this.state);
  }
  get alphaOnly() {
    const current = this.value;
    const result = string_alphaOnly(current);
    this.state.history.push(result);
    return new EveryString(this.state);
  }
  get validate() {
    const current = this.value;
    const result = string_validate(current);
    this.state.history.push(result);
    return new EveryString(this.state);
  }
  get length() {
    const current = this.value;
    const result = string_length(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  get alphaNumber() {
    const current = this.value;
    const result = string_alphaNumber(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  concat(concat: string) {
    const current = this.value;
    const result = string_concat(current, concat);
    this.state.history.push(result);
    return new EveryString(this.state);
  }
}
