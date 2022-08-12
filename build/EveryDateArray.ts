
import Every from "./Every";
import {
  dates_validate,
  dates_length
} from "../example";
import EveryNumber from "./EveryNumber";

export default class EveryDateArray extends Every<Date[]> {
  
  get validate() {
    const current = this.value;
    const result = dates_validate(current);
    this.state.history.push(result);
    return new EveryDateArray(this.state);
  }
  get length() {
    const current = this.value;
    const result = dates_length(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
}
