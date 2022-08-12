
import { State } from "./State"
import EveryString from "./EveryString";
import EveryNumber from "./EveryNumber";
import EveryDate from "./EveryDate";

export class Everything {
  state: State
  constructor() {
    this.state = new State()
  }

  string (value: string) {
    return new EveryString(this.state).string(value)
  }
  number (value: number) {
    return new EveryNumber(this.state).number(value)
  }
  date (value: Date) {
    return new EveryDate(this.state).date(value)
  }
}

const everything = new Everything()
export default everything;
