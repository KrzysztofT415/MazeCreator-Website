import { Hex } from '../view/Hex.js'
export class HexagonalGeometry {
    getCellFromPixels = (x, y) => {
        let q = ((2 / 3) * x) / 30
        let r = ((-1 / 3) * x + (Math.sqrt(3) / 3) * y) / 30

        let [px, py, pz] = [q, -q - r, r]

        let rx = Math.round(px)
        let ry = Math.round(py)
        let rz = Math.round(pz)

        let dx = Math.abs(rx - px)
        let dy = Math.abs(ry - py)
        let dz = Math.abs(rz - pz)

        if (dx > dy && dx > dz) {
            rx = -ry - rz
        } else if (dy > dz) {
            ry = -rx - rz
        } else {
            rz = -rx - ry
        }
        return [rx, rz]
    }

    centerOf = (q, r) => {
        let x = q * 30 * 1.5
        let y = (r + q / 2.0) * 30 * Math.sqrt(3)
        return [x, y]
    }

    Cell = (q, r) => new Hex(q, r)
}
