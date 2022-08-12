
import Every from "./Every";
import {
  date_date,
  date_validate,
  date_length
} from "../example";
import EveryNumber from "./EveryNumber";

export default class EveryDate extends Every<Date> {
  static date(value: Date) {
    return new EveryDate().date(value);
  }
  date(value: Date) {
    const current = this.value;
    const result = date_date(current, value);
    this.state.history.push(result);
    return new EveryDate(this.state);
  }
  get validate() {
    const current = this.value;
    const result = date_validate(current);
    this.state.history.push(result);
    return new EveryDate(this.state);
  }
  get length() {
    const current = this.value;
    const result = date_length(current);
    this.state.history.push(result);
    return new EveryNumber(this.state);
  }
}
