import * as functions from '../functions.js'
import { Algorithm } from './Algorithm.js'
export class RecursiveBacktrackingAlgorithm extends Algorithm {
    unvisited
    stack
    currentCell
    colors
    removedWalls
    board

    constructor(board) {
        super()
        this.unvisited = functions.shuffleArray(board.cells)
        this.stack = []
        this.currentCell = this.unvisited.pop()
        this.colors = functions.getCurrentRootColors()
        this.removedWalls = []
        this.board = board
    }

    step = () => {
        this.unvisited = this.unvisited.filter(e => e !== this.currentCell)
        this.currentCell.getObject.style.fill = this.colors.PL

        if (this.unvisited.length + this.stack.length === 0) {
            this.currentCell.getObject.style.fill = this.colors.SLE
            console.log('end')
            return true
        }

        let neighbours = this.getNeighbours()
        if (neighbours.length > 0) {
            this.stack = [...this.stack, this.currentCell]
            let nextCell = functions.shuffleArray(neighbours).pop()

            let wall = document.getElementById(this.currentCell.getCoordinates().q + '.' + this.currentCell.getCoordinates().r + '|' + nextCell.getCoordinates().q + '.' + nextCell.getCoordinates().r)
            if (wall === null) {
                wall = document.getElementById(nextCell.getCoordinates().q + '.' + nextCell.getCoordinates().r + '|' + this.currentCell.getCoordinates().q + '.' + this.currentCell.getCoordinates().r)
            }
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
        console.dir(this.currentCell)
        return this.currentCell.getDirections
            .map(direction => {
                return this.board.getCell(this.currentCell.getCoordinates().q + direction.q, this.currentCell.getCoordinates().r + direction.r)
            })
            .filter(value => value !== undefined)
            .filter(value => this.unvisited.find(e => e === value) !== undefined)
    }

    getRemovedWalls = () => {
        return this.removedWalls
    }
}
