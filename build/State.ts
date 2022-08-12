export class State {
  history: any[] = [];
  snaps: {[any: string]: any} = {};

  constructor(initialValue?: any) {
    if (initialValue) {
      this.history.push(initialValue)
    }
  }

  get length () {
    return this.history.length
  }

  get hasSnaps() {
    return Object.entries(this.snaps).length > 0;
  }

  get value () {
    const value = this.history[this.length-1]
    return value
  }

  snap (key: string): void {
    this.snaps[key] = this.value
  }
}