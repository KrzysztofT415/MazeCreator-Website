class Hex {
    #cell
    #position
    #center
    #corners
    #edges

    constructor(x, y, a, cell) {
        this.#position = [x, y]
        this.#cell = cell

        this.#center = [x * a * 1.5, (y + x / 2.0) * a * Math.sqrt(3)]

        this.#corners = [...Array(6).keys()].map(
            v => [this.#center[0] + a * Math.cos(Math.PI  * v / 3), this.#center[1] + a * Math.sin(Math.PI  * v / 3)])

        this.#edges = [...Array(6).keys()].map(
            v => [this.#corners[v], this.#corners[(v + 1) % 6]])
    }

    get corners() {return this.#corners}
}