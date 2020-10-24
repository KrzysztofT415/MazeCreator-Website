let handleReset = () => {
    let cells = document.getElementsByClassName('type-hex')
    for (let i = 0; i < cells.length; i++) {
        cells.item(i).classList.replace('status-wall', 'status-empty')
        cells.item(i).classList.replace('status-hidden', 'status-empty')
    }
}

let handleDraw = () => {
    document.getElementById('grid').classList.replace('erasing', 'drawing')
}

let handleErase = () => {
    document.getElementById('grid').classList.replace('drawing', 'erasing')
}

let handleVisualize = () => {
    let cells = document.getElementsByClassName('type-hex')

    let unvisited = []
    let stack = []
    let directions = [[1, 0],[0, 1],[-1, 1],[-1, 0],[0, -1],[1, -1]]

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.replace('status-empty','status-hidden')
        if (cells[i].classList.contains('status-wall')) {
            unvisited = [...unvisited, cells[i]]
        }
    }

    let number = 0

    let recursiveBacktrackingAlgorithm = (currentCell) => {
        unvisited = unvisited.filter(v => v !== currentCell)
        currentCell.style.animationFillMode = 'forwards'

        let q = +currentCell.classList[1].slice(2)
        let r = +currentCell.classList[2].slice(2)

        let neighbours = directions
            .map(v => document.getElementsByClassName(`q-${q + v[0]} r-${r + v[1]}`)[0])
            .filter(v => v.classList.contains('status-wall'))
            .filter(v => unvisited.filter(un => un === v).length > 0)
        number++
        if (neighbours.length > 0) {
            let randomNeighbour = neighbours[getRandomInt(0, neighbours.length)]
            randomNeighbour.animate([
                { fill: 'white' },
                { fill: 'yellow' }
            ], {
                duration: 1000,
                delay: (number * 1000),
                iterations: 1
            });
            stack.push(currentCell)
            recursiveBacktrackingAlgorithm(randomNeighbour)
        } else if (stack.length > 0) {
            currentCell.animate([
                { fill: 'yellow' },
                { fill: 'blue' }
            ], {
                duration: 1000,
                delay: (number * 1000),
                iterations: 1
            });
            recursiveBacktrackingAlgorithm(stack.pop())
        }
    }

    recursiveBacktrackingAlgorithm(unvisited.pop())
}