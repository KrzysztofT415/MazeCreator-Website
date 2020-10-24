window.onload = () => {
  generateGrid()
}

let generateGrid = () => {
    let grid = document.getElementById('grid');
    let width = 40
    let height = 40

    let hexes = [...Array(width).keys()].map(
        x => x = [...Array(height).keys()].map(
            function (y) {
                y -= Math.floor(x / 2)
                let cell = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
                let hex = new Hex(x, y, 50, cell)
                cell.setAttribute('points', hex.corners.reduce((acc, v) => acc + ' ' + v.toString()))
                cell.classList.add('type-hex', 'q-' + x, 'r-' + y, 'q-' + (x % 2 !== 0 ? 'odd' : 'even'), 'r-' + (y % 2 !== 0 ? 'odd' : 'even'), 'status-empty')
                cell.style.transform = 'translate(0px, 0px) scale(1)'
                grid.appendChild(cell)
                return hex;
            }
        )
    )
    let downListener = (e) => {
        switch (e.button) {
            case 0:
                grid.removeEventListener('mousedown', downListener)
                grid.addEventListener('mousemove', draw)
                grid.addEventListener('mouseup', drawUp)
                break
            case 2:
                grid.removeEventListener('mousedown', downListener)
                grid.addEventListener('mousemove', moveGrid)
                grid.addEventListener('mouseup', moveUp)
                break
        }
    }

    let moveGrid = (e) => {
        let items = document.getElementsByClassName('type-hex')
        let values = items[0].style.transform.replace(/[^\d\s.-]/g, '').split(' ').map(v => +v)
        values[0] += e.movementX
        values[1] += e.movementY
        for (let i = 0; i < items.length; ++i) {
            items[i].style.transform = `translate(${+values[0]}px, ${+values[1]}px) scale(${values[2]})`
        }
    }

    let draw = () => {
        let cell = document.querySelectorAll("polygon:hover")
        cell = cell[cell.length - 1]

        if (cell !== undefined) {
            switch (document.getElementById('grid').classList[0]) {
                case 'drawing':
                    cell.classList.replace('status-empty', 'status-wall')
                    break;
                case 'erasing':
                    cell.classList.replace('status-wall', 'status-empty')
                    break;
            }
        }
    }
    let drawUp = () => {
        grid.addEventListener('mousedown', downListener)
        grid.removeEventListener('mousemove', draw)
        grid.removeEventListener('mouseup', drawUp)
    }
    let moveUp = () => {
        grid.addEventListener('mousedown', downListener)
        grid.removeEventListener('mousemove', moveGrid)
        grid.removeEventListener('mouseup', moveUp)
    }
    grid.addEventListener('mousedown', downListener)
    let handleWheel = function (e) {
        let items = document.getElementsByClassName('type-hex')
        let values = items[0].style.transform.replace(/[^\d\s.-]/g, '').split(' ')
        values[2] = Math.min(Math.max(.2, +values[2] + e.deltaY * -0.0004), 1);
        for (let i = 0; i < items.length; ++i) {
            items[i].style.transform = `translate(${+values[0]}px, ${+values[1]}px) scale(${values[2]})`
        }
    }

    grid.addEventListener('wheel', handleWheel)

}