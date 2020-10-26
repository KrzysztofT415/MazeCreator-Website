window.onload = () => {
    document.getElementById('grid').classList.add((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'notMobile'));

    let board = new Board()
    generateGrid()
}

let generateGrid = () => {
    let grid = document.getElementById('grid');
    let width = 10
    let height = 10

    let hexes = [...Array(width).keys()].map(
        x => x = [...Array(height).keys()].map(
            y => new Hex(x, y - Math.floor(x / 2))
        )
    )

    let downListener = e => {
        switch (e.button) {
            case 0:
                draw()
                grid.removeEventListener('pointerdown', downListener)
                grid.addEventListener('pointermove', draw)
                grid.addEventListener('pointerup', drawUp)
                break
            case 2:
                moveGrid()
                grid.removeEventListener('pointerdown', downListener)
                grid.addEventListener('pointermove', moveGrid)
                grid.addEventListener('pointerup', moveUp)
                break
        }
    }

    let moveGrid = e => {
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
    let handleWheel = e => {
        let items = document.getElementsByClassName('type-hex')
        let values = items[0].style.transform.replace(/[^\d\s.-]/g, '').split(' ')
        values[2] = Math.min(Math.max(.2, +values[2] + e.deltaY * -0.0004), 1);
        for (let i = 0; i < items.length; ++i) {
            items[i].style.transform = `translate(${+values[0]}px, ${+values[1]}px) scale(${values[2]})`
        }
    }

    grid.addEventListener('wheel', handleWheel)

}