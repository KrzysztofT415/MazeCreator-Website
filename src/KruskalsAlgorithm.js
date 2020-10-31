class KruskalsAlgorithm {
    sets
    walls
    colors

    constructor(board) {
        this.walls = shuffleArray(board.getWalls()).map(wall => {
            let coords1 = wall.id.split('|')[0].split('.')
            let coords2 = wall.id.split('|')[1].split('.')
            let hex1 = document.getElementById(coords1[0] + '.' + coords1[1])
            let hex2 = document.getElementById(coords2[0] + '.' + coords2[1])
            if (hex1 === null || hex2 === null) { return undefined }
            return {wall: wall,h1: hex1,h2: hex2}
        }).filter(v => v !== undefined)
        this.sets = board.getHexes()
        for (let i = 0; i < this.sets.length; i++) {
            this.sets[i] = {set: i, cells: [this.sets[i]]}
        }
        this.colors = getCurrentRootColors()
    }

    step = () => {
        if (this.sets.length === 1) {
            console.log('end')
            return true
        }
        else if (this.walls.length === 0) {
            for (let i = 0; i < this.sets.length; ++i) {
                if (this.sets[i].cells.length === 1) { this.sets[i].cells[0].getObject.style.fill = this.colors.SLE }
            }
            console.log('end 2')
            return true
        }
        else {
            let wall = this.walls.pop()

            let set1 = this.sets.filter(v => v.cells.filter(c => c.object === wall.h1).length !== 0)[0]
            let set2 = this.sets.filter(v => v.cells.filter(c => c.object === wall.h2).length !== 0)[0]
            if (set1 !== set2) {
                wall.h1.style.fill = this.colors.SLE
                wall.h2.style.fill = this.colors.SLE
                set2.cells.map(v => set1.cells = [...set1.cells, v])
                this.sets = deleteFromArray(this.sets, set2)
                document.getElementById('walls').removeChild(wall.wall)
            }

        return false
        }
    }

}
//     else {
//         Pair<Pair<Cell, Integer>,Pair<Cell, Integer>> wall = walls.get(random.nextInt(walls.size()));
//         ArrayList<Cell> ws1 = null;
//         ArrayList<Cell> ws2 = null;
//         for (ArrayList<Cell> set : sets) {
//             if (set.contains(wall.getKey().getKey())) {
//                 ws1 = set;
//                 break; }
//         }
//         for (ArrayList<Cell> set : sets) {
//             if (set.contains(wall.getValue().getKey())) {
//                 ws2 = set;
//                 break; }
//         }
//         if (ws1 != ws2 && ws1 != null) {
//             ws1.addAll(ws2);
//             sets.remove(ws2);
//             wall.getKey().getKey().setState(CellState.FINISHED);
//             wall.getValue().getKey().setState(CellState.FINISHED);
//             wall.getKey().getKey().getEdges()[wall.getKey().getValue()].setVisible(false);
//             wall.getValue().getKey().getEdges()[wall.getValue().getValue()].setVisible(false);
//         }
//         walls.remove(wall);
//     }
//     return null;
// }