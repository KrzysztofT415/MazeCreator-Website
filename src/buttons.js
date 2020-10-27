const toggleButton = document.getElementById('burger')
const navbarLinks = document.getElementById('navbar-links')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
    toggleButton.classList.toggle('open')
})

let handleReset = () => {
    while (document.getElementsByClassName('type-hex').length > 0) {
        for (let i = 0; i < document.getElementsByClassName('type-hex').length; ++i) {
            document.getElementById('grid').removeChild(document.getElementsByTagName('polygon').item(i))
        }
    }
}

let toggleDrawingMode = (mode) => {
    switch (mode) {
        case 'erase':
            document.getElementById('erase').classList.add('chosen')
            document.getElementById('draw').classList.remove('chosen')
            document.getElementById('grid').classList.remove('drawing')
            break;
        case 'draw':
            document.getElementById('erase').classList.remove('chosen')
            document.getElementById('draw').classList.add('chosen')
            document.getElementById('grid').classList.add('drawing')
            break;
    }
}

let handleVisualize = () => {
    let cells = document.getElementsByClassName('type-hex')

    let unvisited = []
    let stack = []

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.replace('status-empty','status-hidden')
        if (cells[i].classList.contains('status-wall')) {
            unvisited = [...unvisited, cells[i]]
        }
    }

    if (unvisited.length === 0) return

    let number = 0

    let recursiveBacktrackingAlgorithm = (currentCell) => {
        unvisited = unvisited.filter(v => v !== currentCell)
        currentCell.style.animationFillMode = 'forwards'

        let q = +currentCell.classList[1].slice(2)
        let r = +currentCell.classList[2].slice(2)

        let neighbours = Hex.directions
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