import { Hex } from '../view/Hex'

export class Cell {
    constructor(q, r) {
        this._cellView = new Hex(q, r)
    }

    set state(newState) {
        this._state = newState
    }
    get state() {
        return _state
    }

    shutdown = _ => {}
}
