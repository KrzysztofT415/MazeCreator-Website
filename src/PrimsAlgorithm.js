class PrimsAlgorithm {
    unvisited
    toVisit
    visited
    colors
    removedWalls

    constructor(board) {
        this.colors = getCurrentRootColors()
        this.unvisited = shuffleArray(board.getHexes())
        let start = this.unvisited.pop()
        start.getObject.style.fill = this.colors.SLE
        this.toVisit = this.getNeighbours(start)
        this.toVisit.map(v => v.getObject.style.fill = this.colors.PL)
        this.visited = [start]
        this.removedWalls = []
    }

    step = () => {
        if (this.toVisit.length === 0) { return 1 }
        this.toVisit = shuffleArray(this.toVisit)
        let newCell = this.toVisit.pop()

        let walls = this.getNeighbours(newCell).filter(v => getElementIfExists(this.visited, v) !== undefined)
        walls = shuffleArray(walls).pop()
        let wall = document.getElementById(newCell.getCoordinates().q + '.' + newCell.getCoordinates().r + "|" + walls.getCoordinates().q + '.' + walls.getCoordinates().r)
        if (wall === null) { wall = document.getElementById(walls.getCoordinates().q + '.' + walls.getCoordinates().r + "|" + newCell.getCoordinates().q + '.' + newCell.getCoordinates().r)}
        this.removedWalls = [...this.removedWalls, wall]
        document.getElementById('walls').removeChild(wall)

        this.visited = [...this.visited, newCell]
        newCell.getObject.style.fill = this.colors.SLE
        this.unvisited.filter(v => (v.getCoordinates().q !== newCell.getCoordinates().q) || (v.getCoordinates().r !== newCell.getCoordinates().r))
        let neighbours = this.getNeighbours(newCell)
        neighbours.map(v => {
            if ((getElementIfExists(this.toVisit, v) === undefined) && (getElementIfExists(this.visited, v) === undefined)) {
                this.toVisit = [...this.toVisit, v]
                v.getObject.style.fill = this.colors.PL
            }
        })
        return 0
    }

    getNeighbours = (cell) => {
        return cell.getDirections
            .map(direction => { return board.getHex(cell.getCoordinates().q + direction.q, cell.getCoordinates().r + direction.r)[0] })
            .filter(value => value !== undefined)
    }

    getRemovedWalls = () => { return this.removedWalls }
}