import { State } from "./State"

export default class Every<T> {
  state: State
  constructor(state?: State) {
    this.state = state || new State();
  }

  get value (): T {
    return this.state.value
  }
}