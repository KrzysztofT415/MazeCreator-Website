class RecursiveBacktrackingAlgorithm {
    unvisited
    stack
    currentCell
    colors
    removedWalls

    constructor(board) {
        this.unvisited = shuffleArray(board.getHexes())
        this.stack = []
        this.currentCell = this.unvisited.pop()
        this.colors = getCurrentRootColors()
        this.removedWalls = []
    }

    step = () => {
        this.unvisited = deleteFromArray(this.unvisited, this.currentCell)
        this.currentCell.getObject.style.fill = this.colors.PL

        if (this.unvisited.length + this.stack.length === 0) {
            this.currentCell.getObject.style.fill = this.colors.SLE
            console.log('end')
            return true
        }

        let neighbours = this.getNeighbours()
        if (neighbours.length > 0) {
            this.stack = [...this.stack, this.currentCell]
            let nextCell = shuffleArray(neighbours).pop()

            let wall = document.getElementById(this.currentCell.getCoordinates().q + '.' + this.currentCell.getCoordinates().r + "|" + nextCell.getCoordinates().q + '.' + nextCell.getCoordinates().r)
            if (wall === null) { wall = document.getElementById(nextCell.getCoordinates().q + '.' + nextCell.getCoordinates().r + "|" + this.currentCell.getCoordinates().q + '.' + this.currentCell.getCoordinates().r)}
            this.removedWalls = [...this.removedWalls, wall]
            document.getElementById('walls').removeChild(wall)
            this.currentCell = nextCell

        } else if (this.stack.length > 0) {
            this.currentCell.getObject.style.fill = this.colors.SLE
            this.currentCell = this.stack.pop()

        } else if (this.unvisited.length > 0) {
            this.currentCell.getObject.style.fill = this.colors.SLE
            this.currentCell = this.unvisited.pop()
        }
    }

    getNeighbours = () => {
        return this.currentCell.getDirections
            .map(direction => { return board.getHex(this.currentCell.getCoordinates().q + direction.q, this.currentCell.getCoordinates().r + direction.r)[0] })
            .filter(value => value !== undefined)
            .filter(value => getElementIfExists(this.unvisited, value) !== undefined )
    }

    getRemovedWalls = () => { return this.removedWalls }
}