import * as functions from '../functions.js'
import { Algorithm } from './Algorithm.js'
export class PrimsAlgorithm extends Algorithm {
    unvisited
    toVisit
    visited
    colors
    removedWalls
    board

    constructor(board) {
        super()
        this.board = board
        console.log(board)
        this.colors = functions.getCurrentRootColors()
        this.unvisited = functions.shuffleArray(board.cells)
        let start = this.unvisited.pop()
        start.getObject.style.fill = this.colors.SLE
        this.toVisit = this.getNeighbours(start)
        this.toVisit.map(v => (v.getObject.style.fill = this.colors.PL))
        this.visited = [start]
        this.removedWalls = []
    }

    step = () => {
        if (this.toVisit.length === 0) {
            return 1
        }
        this.toVisit = functions.shuffleArray(this.toVisit)
        let newCell = this.toVisit.pop()

        let walls = this.getNeighbours(newCell).filter(v => this.visited.find(e => e === v) !== undefined)
        walls = functions.shuffleArray(walls).pop()
        let wall = document.getElementById(newCell.getCoordinates().q + '.' + newCell.getCoordinates().r + '|' + walls.getCoordinates().q + '.' + walls.getCoordinates().r)
        if (wall === null) {
            wall = document.getElementById(walls.getCoordinates().q + '.' + walls.getCoordinates().r + '|' + newCell.getCoordinates().q + '.' + newCell.getCoordinates().r)
        }
        this.removedWalls = [...this.removedWalls, wall]
        document.getElementById('walls').removeChild(wall)

        this.visited = [...this.visited, newCell]
        newCell.getObject.style.fill = this.colors.SLE
        this.unvisited.filter(v => v.getCoordinates().q !== newCell.getCoordinates().q || v.getCoordinates().r !== newCell.getCoordinates().r)
        let neighbours = this.getNeighbours(newCell)
        neighbours.map(v => {
            if (this.toVisit.find(e => e === v) === undefined && this.visited.find(e => e === v) === undefined) {
                this.toVisit = [...this.toVisit, v]
                v.getObject.style.fill = this.colors.PL
            }
        })
        return 0
    }

    getNeighbours = cell => {
        return cell.getDirections
            .map(direction => {
                return this.board.getCell(cell.getCoordinates().q + direction.q, cell.getCoordinates().r + direction.r)
            })
            .filter(value => value !== undefined)
    }

    getRemovedWalls = () => {
        return this.removedWalls
    }
}
