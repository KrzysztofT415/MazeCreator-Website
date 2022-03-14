import { HexagonalGeometry } from './HexagonalGeometry.js'
export class Board {
    _cells = []
    constructor() {
        this.geometry = new HexagonalGeometry(10)
        this._cells = []

        document.getElementById('reset').addEventListener('click', () => {
            this._cells = []
        })
    }

    addCellOnPoint = (x, y) => this.addCell(...this.geometry.getCellFromPixels(x, y))
    addCell = (q, r) => {
        if (this.cellExists(q, r)) return
        if (!(q in this._cells)) this._cells[q] = []
        this._cells[q][r] = this.geometry.Cell(q, r)
    }

    removeCellOnPoint = (x, y) => this.removeCell(...this.geometry.getCellFromPixels(x, y))
    removeCell = (q, r) => {
        if (!this.cellExists(q, r)) return
        this._cells[q][r].shutdown()
        delete this._cells[q][r]
        if (!Object.keys(this._cells[q]).length) delete this._cells[q]
    }

    getCell = (q, r) => {
        if (this.cellExists(q, r)) return this._cells[q][r]
        return null
    }

    cellExists = (q, r) => q in this._cells && r in this._cells[q]

    get cells() {
        let result = []
        this._cells.forEach(val => (result = [...result, ...val]))
        return result
    }

    getWalls = () => {
        let walls = []
        this._cells.map(cell => {
            cell.getEdges.map(edge => {
                if (walls.find(e => e === edge) === undefined) {
                    walls = [...walls, edge]
                }
            })
        })
        return walls
    }
}
