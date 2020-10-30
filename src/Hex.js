class Hex {
    coordinates
    object
    center
    corners
    edges
    directions = [{q: 1, r: 0},{q: 0, r: 1},{q: -1, r: 1},{q: -1, r: 0},{q: 0, r: -1},{q: 1, r: -1}]

    constructor(q, r) {
        this.coordinates = {q: q, r: r}

        let size = 50
        this.center = [q * size * 1.5, (r + q / 2.0) * size * Math.sqrt(3)]

        this.corners = [...Array(6).keys()].map(
            v => [this.center[0] + size * Math.cos(Math.PI  * v / 3), this.center[1] + size * Math.sin(Math.PI  * v / 3)])

        this.edges = [...Array(6).keys()].map(
            v => [this.corners[v], this.corners[(v + 1) % 6]])

        this.object = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        this.object.id = q + '-' + r
        this.object.setAttribute('points', this.corners.reduce((acc, v) => acc + ' ' + v.toString()))
        this.object.classList.add('empty')
        document.getElementById('cells').appendChild(this.object)

        for (let i = 0; i < this.edges.length; i++) {
            let wall = document.getElementById((q + this.directions[i].q) + '-' + (r + this.directions[i].r) + '|' + q + '-' + r)
            if (wall === null) {
                wall = document.createElementNS('http://www.w3.org/2000/svg', 'line')
                wall.id = q + '.' + r + '|' + (q + this.directions[i].q) + '.' + (r + this.directions[i].r)
                wall.setAttribute('x1', this.edges[i][0][0] + '')
                wall.setAttribute('y1', this.edges[i][0][1] + '')
                wall.setAttribute('x2', this.edges[i][1][0] + '')
                wall.setAttribute('y2', this.edges[i][1][1] + '')
                document.getElementById('walls').appendChild(wall)
            }
            this.edges[i] = wall
        }
    }

    set setState(newState) { this.object.classList.replace(``,`status-${newState}`) }

    get getEdges() { return this.edges }
    get getCoordinates() { return this.coordinates }
    get getDirections() { return this.directions }
    get getObject() { return this.object }
}