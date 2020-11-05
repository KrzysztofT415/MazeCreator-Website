class Board {
    hexes = []
    size = 50
    constructor() {
        this.hexes = []
        this.size = 50
        let width = 20
        let height = 20

        let sth = [...Array(width).keys()]
            sth.map(
            x => x = [...Array(height).keys()].map(
                y => this.hexes = [...this.hexes, new Hex(x, y - Math.floor(x / 2))]
            )
        )

        document.getElementById('reset').addEventListener('click', () => {
            this.hexes = []
        })
    }

    addHexOnPoint = (x, y) => {
        let hex = this.pixel_to_flat_hex(x, y)
        let object = document.getElementById(`${hex.q}.${hex.r}`)
        if (object === null) { this.hexes = [...this.hexes, new Hex(hex.q, hex.r)] }
    }

    removeHexOnPoint = (x, y) => {
        let hex = this.pixel_to_flat_hex(x, y)
        let object = document.getElementById(`${hex.q}.${hex.r}`)
        if (object !== null) {
            let current = this.hexes.filter(v => ((v.getCoordinates().q === hex.q) && (v.getCoordinates().r === hex.r)))[0]
            current.getEdges.map(edge => {
                let coords1 = edge.id.split('|')[0].split('.')
                let coords2 = edge.id.split('|')[1].split('.')
                if ((this.getHex(coords1[0], coords1[1]).length === 0) || (this.getHex(coords2[0], coords2[1]).length === 0)) {
                    document.getElementById('walls').removeChild(edge)
                }
            })

            this.hexes = this.hexes.filter(v => ((v.getCoordinates().q !== hex.q) || (v.getCoordinates().r !== hex.r)))
            document.getElementById('cells').removeChild(object)
        }
    }

    pixel_to_flat_hex = (x, y) => {
        let q = (2. / 3 * x) / this.size
        let r = (-1. / 3 * x + Math.sqrt(3) / 3 * y) / this.size
        return this.hex_round({q: q, r: r})
    }

    cube_round = (cube) => {
        let rx = Math.round(cube.x)
        let ry = Math.round(cube.y)
        let rz = Math.round(cube.z)

        let x_diff = Math.abs(rx - cube.x)
        let y_diff = Math.abs(ry - cube.y)
        let z_diff = Math.abs(rz - cube.z)

        if (x_diff > y_diff && x_diff > z_diff) {
            rx = -ry - rz
        } else if (y_diff > z_diff) {
            ry = -rx - rz
        } else {
            rz = -rx - ry
        }
        return {x: rx,y: ry,z: rz}
    }

    cube_to_axial = (cube) => {
        let q = cube.x
        let r = cube.z
        return {q: q,r: r}
    }

    axial_to_cube = (hex) => {
        let x = hex.q
        let z = hex.r
        let y = -x - z
        return {x: x,y: y,z: z}
    }

    hex_round = (hex) => {
        return this.cube_to_axial(this.cube_round(this.axial_to_cube(hex)))
    }

    getHex = (q, r) => {
        return this.hexes.filter(v => ((v.getCoordinates().q === +q) && (v.getCoordinates().r === +r)))
    }
    get getSize() { return this.size }
    getHexes = () => {
        let hexesr = []
        this.hexes.map(v => hexesr = [...hexesr, v])
        return hexesr
    }

    getWalls = () => {
        let walls = []
        this.hexes.map(cell => {
            cell.getEdges.map(edge => {
                if (walls.find(e => e === edge) === undefined) { walls = [...walls, edge] }
            })
        })
        return walls
    }
}