class Hex {
    #position
    #object
    #center
    #corners
    #edges

    constructor(x, y) {
        this.#position = [x, y]

        let a = 50
        this.#center = [x * a * 1.5, (y + x / 2.0) * a * Math.sqrt(3)]

        this.#corners = [...Array(6).keys()].map(
            v => [this.#center[0] + a * Math.cos(Math.PI  * v / 3), this.#center[1] + a * Math.sin(Math.PI  * v / 3)])

        this.#edges = [...Array(6).keys()].map(
            v => [this.#corners[v], this.#corners[(v + 1) % 6]])

        this.#object = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        this.#object.setAttribute('points', this.#corners.reduce((acc, v) => acc + ' ' + v.toString()))
        this.#object.id = x + '-' + y
        this.#object.classList.add('type-hex', 'q-' + x, 'r-' + y, 'q-' + (x % 2 !== 0 ? 'odd' : 'even'), 'r-' + (y % 2 !== 0 ? 'odd' : 'even'), 'status-empty')

        document.getElementById('grid').appendChild(this.#object)
    }

    set setState(newState) { this.#object.classList.replace(``,`status-${newState}`) }
}