let grid = document.getElementById('grid')
let isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'notMobile')
grid.classList.add(isMobile)
isMobile = (isMobile === 'mobile')
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
    let values = getCurrentRootTransform()
    values.tx += e.movementX
    values.ty += e.movementY
    document.documentElement.style.setProperty('--current-translateX', values.tx)
    document.documentElement.style.setProperty('--current-translateY', values.ty)
    document.getElementById('cells').style.transform = `translate(${+values.tx}px, ${+values.ty}px) scale(${values.sc})`
    document.getElementById('walls').style.transform = `translate(${+values.tx}px, ${+values.ty}px) scale(${values.sc})`
}

let draw = e => {
    let pos = getTranslatedPosition(e.clientX, e.clientY)
    if (grid.classList.contains('drawing')) { board.addHexOnPoint(pos.x, pos.y) }
    else { board.removeHexOnPoint(pos.x, pos.y) }
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
pointer.setAttribute('points', '50,0 25.000000000000007,43.30127018922193 -24.99999999999999,43.30127018922194 -50,6.123233995736766e-15 -25.00000000000002,-43.301270189221924 25.000000000000007,-43.30127018922193')
pointer.id = 'pointer'
document.getElementById('mouse').appendChild(pointer)

let highlight = e => {
    let pos = getTranslatedPosition(e.clientX, e.clientY)
    pos = board.pixel_to_flat_hex(pos.x, pos.y)
    let values = getCurrentRootTransform()
    pos.r = (pos.r + pos.q / 2.0) * board.getSize * Math.sqrt(3) * values.sc
    pos.q = pos.q * board.getSize * 1.5 * values.sc
    document.getElementById('pointer').setAttribute('transform', `translate(${pos.q + values.tx} ${pos.r + values.ty}) scale(${values.sc})`)
}

grid.addEventListener('pointermove', highlight)
grid.addEventListener('wheel', highlight)

let handleWheel = e => {
    let values = getCurrentRootTransform()
    values.sc = Math.min(Math.max(.2, +values.sc + e.deltaY * -0.0004), 1);
    document.documentElement.style.setProperty('--current-scale', values.sc)
    document.getElementById('cells').style.transform = `translate(${+values.tx}px, ${+values.ty}px) scale(${values.sc})`
    document.getElementById('walls').style.transform = `translate(${+values.tx}px, ${+values.ty}px) scale(${values.sc})`
}

grid.addEventListener('wheel', handleWheel)
let init = 0
let algorithm
let handleVisualize = () => {

    if (!init) {
        algorithm = getComputedStyle(document.documentElement).getPropertyValue('--generating-algorithm')
        switch (algorithm) {
            case 'recursiveBacktracking':
                algorithm = new RecursiveBacktrackingAlgorithm(board)
                break;
        }
        init = 1
    }

    let status = 1
    do {
        status = algorithm.step()
    } while (status !== 0)
    init = 0;
}

document.getElementById('visualize').addEventListener('click', () => handleVisualize())
