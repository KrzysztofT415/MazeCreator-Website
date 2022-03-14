import * as functions from './functions.js'
import { Board } from './model/Board.js'
import { RecursiveBacktrackingAlgorithm } from './algorithms/RecursiveBacktrackingAlgorithm.js'
import { PrimsAlgorithm } from './algorithms/PrimsAlgorithm.js'
import { KruskalsAlgorithm } from './algorithms/KruskalsAlgorithm.js'
import { Algorithm } from './algorithms/Algorithm.js'
import { WindowManager } from './components/WindowManager.js'

let grid = document.getElementById('grid')
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'notMobile'
grid.classList.add(isMobile)
isMobile = isMobile === 'mobile'
const board = new Board()

let downListener = e => {
    switch (e.button) {
        case 0:
            draw(e)
            grid.removeEventListener('pointerdown', downListener)
            grid.addEventListener('pointermove', draw)
            grid.addEventListener('pointerup', drawUp)
            break
        case 2:
            grid.removeEventListener('pointerdown', downListener)
            grid.addEventListener('pointermove', moveGrid)
            grid.addEventListener('pointerup', moveUp)
            break
    }
}

let moveGrid = e => {
    let [sc, tx, ty] = functions.getCurrentRootTransform()
    tx += e.movementX
    ty += e.movementY
    document.documentElement.style.setProperty('--current-translateX', tx)
    document.documentElement.style.setProperty('--current-translateY', ty)
    document.getElementById('cells').style.transform = `translate(${+tx}px, ${+ty}px) scale(${sc})`
    document.getElementById('walls').style.transform = `translate(${+tx}px, ${+ty}px) scale(${sc})`
}

let draw = e => {
    let [x, y] = functions.getTranslatedPosition(e.clientX, e.clientY)
    if (grid.classList.contains('drawing')) {
        board.addCellOnPoint(x, y)
    } else {
        board.removeCellOnPoint(x, y)
    }
}
let drawUp = () => {
    grid.addEventListener('pointerdown', downListener)
    grid.removeEventListener('pointermove', draw)
    grid.removeEventListener('pointerup', drawUp)
}
let moveUp = () => {
    grid.addEventListener('pointerdown', downListener)
    grid.removeEventListener('pointermove', moveGrid)
    grid.removeEventListener('pointerup', moveUp)
}

grid.addEventListener('pointerdown', downListener)

let pointer = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
pointer.setAttribute('points', '0 30, 10 10, 30 0, 10 -10, 0 -30, -10 -10, -30 0, -10 10')
pointer.id = 'pointer'
document.getElementById('mouse').appendChild(pointer)

let highlight = e => {
    let position = functions.getTranslatedPosition(e.clientX, e.clientY)
    let coords = board.geometry.getCellFromPixels(...position)
    let [dx, dy] = board.geometry.centerOf(...coords)
    let [tx, ty, sc] = functions.getCurrentRootTransform()
    document.getElementById('pointer').setAttribute('transform', `translate(${dx * sc + tx} ${dy * sc + ty}) scale(${sc})`)
}

grid.addEventListener('pointermove', highlight)
grid.addEventListener('wheel', highlight)

let handleWheel = e => {
    let [sc, tx, ty] = functions.getCurrentRootTransform()
    sc = +sc + e.deltaY * -0.0004
    document.documentElement.style.setProperty('--current-scale', sc)
    document.getElementById('cells').style.transform = `translate(${+tx}px, ${+ty}px) scale(${sc})`
    document.getElementById('walls').style.transform = `translate(${+tx}px, ${+ty}px) scale(${sc})`
}

grid.addEventListener('wheel', handleWheel)
let algorithm
let handleVisualize = () => {
    let cells = document.getElementById('cells').children
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.fill = functions.getCurrentRootColors().DD
    }
    if (algorithm) {
        algorithm.stop = true
        // let walls = algorithm.getRemovedWalls()
        // for (let i = 0; i < walls.length; i++) {
        //     document.getElementById('walls').appendChild(walls[i])
        // }
        algorithm = null
    }

    switch (getComputedStyle(document.documentElement).getPropertyValue('--generating-algorithm')) {
        case 'recursiveBacktracking':
            algorithm = new RecursiveBacktrackingAlgorithm(board)
            break
        case 'kruskals':
            algorithm = new KruskalsAlgorithm(board)
            break
        case 'prims':
            algorithm = new PrimsAlgorithm(board)
            break
        default:
            console.log('error')
            algorithm = new RecursiveBacktrackingAlgorithm(board)
    }

    algorithm.start()
}

document.getElementById('visualize').addEventListener('click', () => handleVisualize())

let coloring = false

let coloringMode = e => {
    let [x, y] = functions.getTranslatedPosition(e.clientX, e.clientY)
    let hex = board.pixel_to_flat_hex(x, y)
    let object = document.getElementById(`${hex.q}.${hex.r}`)
    object.classList.toggle('colored')
}

let toggleColoring = () => {
    if (coloring) {
        grid.style.cursor = 'default'
        grid.removeEventListener('pointerdown', coloringMode)
        grid.addEventListener('pointerdown', downListener)
        coloring = false
    } else {
        grid.style.cursor = 'pointer'
        grid.addEventListener('pointerdown', coloringMode)
        grid.removeEventListener('pointerdown', downListener)
        coloring = true
    }
}

let handleKeys = e => {
    switch (e.code) {
        case 'KeyA':
            document.getElementById('algorithm').click()
            break
        case 'KeyR':
            document.getElementById('reset').click()
            break
        case 'KeyD':
            document.getElementById('draw').click()
            break
        case 'KeyE':
            document.getElementById('erase').click()
            break
        case 'KeyV':
            document.getElementById('visualize').click()
            break
        case 'KeyP':
            toggleColoring()
            break
    }
}

document.addEventListener('keydown', handleKeys)

window.onerror = function (message, source, lineno, colno, error) {
    document.getElementById('info').innerHTML = message
}
