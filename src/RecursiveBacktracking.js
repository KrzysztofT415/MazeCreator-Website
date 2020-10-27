class RecursiveBacktrackingAlgorithm {
    unvisited
    stack
    currentCell

    constructor(board) {
        this.unvisited = shuffleArray(board.getHexes)
        this.stack = []
        this.currentCell = this.unvisited.pop()
    }

    step = () => {
        this.unvisited = deleteFromArray(this.unvisited, this.currentCell)
        this.currentCell.getObject.style.fill = 'orange'
        let wall = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        wall.setAttribute('x1', this.currentCell.getEdges[0][0][0])
        wall.setAttribute('y1', this.currentCell.getEdges[0][0][1])
        wall.setAttribute('x2', this.currentCell.getEdges[0][1][0])
        wall.setAttribute('y2', this.currentCell.getEdges[0][1][1])
        wall.style.strokeWidth = '3px'
        wall.style.stroke = 'blue'
        grid.appendChild(wall)

        if (this.unvisited.length + this.stack.length === 0) {
            this.currentCell.getObject.style.fill = 'blue'
            return undefined
        }

        let neighbours = this.getNeighbours()

        if (neighbours.length > 0) {
            this.stack = [...this.stack, this.currentCell]
            let nextCell = shuffleArray(neighbours).pop()
            nextCell.getObject.style.fill = 'yellow'
            this.currentCell = nextCell

        } else if (this.stack.length > 0) {
            this.currentCell.getObject.style.fill = 'blue'
            this.currentCell = this.stack.pop()

        } else if (this.unvisited.length > 0) {
            this.currentCell.getObject.style.fill = 'blue'
            this.currentCell = this.unvisited.pop()
        }
    }

    getNeighbours = () => {
        return this.currentCell.getDirections
            .map(direction => { return board.getHex(this.currentCell.getCoordinates.q + direction.q, this.currentCell.getCoordinates.r + direction.r) })
            .filter(value => value !== undefined)
            .filter(value => getElementIfExists(this.unvisited, value) !== undefined )
    }
}