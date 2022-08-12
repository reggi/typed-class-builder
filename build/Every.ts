import { timeStamp } from "console";
import { State } from "./State"

export default class Every<T> {
  state: State
  constructor(state?: State) {
    this.state = state || new State();
  }

  get value (): T {
    return this.state.value
  }

  get snaps () {
    return this.state.snaps
  }

  snap (name: string) {
    this.state.snap(name)
    return this;
  }

  reset() {
    const value = this.value
    this.state = new State(value);
    return this
  }

  clone () {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this).reset()
  }

  sideSnap (name: string | ((chain: this) => Every<any>), cb?: (chain: this) => Every<any>) {
    const sidechainCallback = (typeof name === 'function') ? name : cb
    if (!sidechainCallback) throw new Error('no callback for sidechain')
    const sidechain = sidechainCallback(this.clone())
    const optionalAddition = (typeof name === 'string') ? { [name]: sidechain.value } : {}
    Object.assign(this.state.snaps, {...optionalAddition, ...sidechain.snaps})
    return this
  }

  sidechain (name: string | ((chain: this) => Every<any>), cb?: (chain: this) => Every<any>) {
    return this.sideSnap(name, cb)
  }

  useSnaps<T extends Every<any>> (cb: (chain: any) => T): T {
    return cb(this.snaps)
  }
}
