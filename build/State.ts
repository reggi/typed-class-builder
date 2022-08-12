export class State {
  history: any[] = [];

  get length () {
    return this.history.length
  }

  get value () {
    return this.history[this.length-1]
  }
}