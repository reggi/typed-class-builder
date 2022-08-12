
import Every from "./Every";
import {
  strings_validate,
  strings_length,
  strings_alphaNumber
} from "../example";
import EveryNumber from "./EveryNumber";

export default class EveryStringArray extends Every<string[]> {
  
  get validate() {
    const current = this.value;
    const result = strings_validate(current);
    this.state.history.push(result);
    return new EveryStringArray(this.state);
  }
  get length() {
    const current = this.value;
    const result = strings_length(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  get alphaNumber() {
    const current = this.value;
    const result = strings_alphaNumber(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
}
