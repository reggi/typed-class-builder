
import Every from "./Every";
import {
  numbers_validate,
  numbers_length,
  numbers_add
} from "../example";
import EveryNumber from "./EveryNumber";

export default class EveryNumberArray extends Every<number[]> {
  get validate() {
    const current = this.value;
    const result = numbers_validate(current);
    this.state.history.push(result);
    return new EveryNumberArray(this.state);
  }
  get length() {
    const current = this.value;
    const result = numbers_length(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
  get add() {
    const current = this.value;
    const result = numbers_add(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
}
