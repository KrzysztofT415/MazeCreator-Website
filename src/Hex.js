class Hex {
    #a = 20
    #cell
    #position
    #center
    #corners
    #edges

    constructor(x, y, cell) {
        this.#position = [x, y]
        this.#cell = cell

        this.#center = [x * this.#a * 1.5, (y + x / 2.0) * this.#a * Math.sqrt(3)]

        this.#corners = [...Array(6).keys()].map(
            v => [this.#center[0] + this.#a * Math.cos(Math.PI  * v / 3), this.#center[1] + this.#a * Math.sin(Math.PI  * v / 3)])

        this.#edges = [...Array(6).keys()].map(
            v => [this.#corners[v], this.#corners[(v + 1) % 6]])
    }

    get corners() {return this.#corners}
}