class Hex {
    #coordinates
    #object
    #center
    #corners
    #edges
    static directions = [[1, 0],[0, 1],[-1, 1],[-1, 0],[0, -1],[1, -1]]

    constructor(q, r) {
        this.#coordinates = {q: q, r: r}

        let size = 50
        this.#center = [q * size * 1.5, (r + q / 2.0) * size * Math.sqrt(3)]

        this.#corners = [...Array(6).keys()].map(
            v => [this.#center[0] + size * Math.cos(Math.PI  * v / 3), this.#center[1] + size * Math.sin(Math.PI  * v / 3)])

        this.#edges = [...Array(6).keys()].map(
            v => [this.#corners[v], this.#corners[(v + 1) % 6]])

        this.#object = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        this.#object.setAttribute('points', this.#corners.reduce((acc, v) => acc + ' ' + v.toString()))
        this.#object.id = q + '-' + r
        this.#object.classList.add('type-hex', 'q-' + q, 'r-' + r, 'q-' + (q % 2 !== 0 ? 'odd' : 'even'), 'r-' + (r % 2 !== 0 ? 'odd' : 'even'), 'status-empty')

        let values = getCurrentRootProperties()
        this.#object.style.transform = `translate(${values.tx}px, ${values.ty}px) scale(${values.sc})`

        document.getElementById('grid').appendChild(this.#object)
    }

    set setState(newState) { this.#object.classList.replace(``,`status-${newState}`) }

    get coordinates() { return this.#coordinates }
}