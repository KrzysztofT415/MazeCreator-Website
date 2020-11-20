const toggleButton = document.getElementById('burger')
const navbarLinks = document.getElementById('navbar-links')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
    toggleButton.classList.toggle('open')
})

let toggleDrawingMode = (mode) => {
    switch (mode) {
        case 'erase':
            document.getElementById('erase').classList.add('chosen')
            document.getElementById('draw').classList.remove('chosen')
            document.getElementById('grid').classList.remove('drawing')
            document.getElementById('mouse').classList.add('erasing')
            break;
        case 'draw':
            document.getElementById('erase').classList.remove('chosen')
            document.getElementById('draw').classList.add('chosen')
            document.getElementById('grid').classList.add('drawing')
            document.getElementById('mouse').classList.remove('erasing')

            break;
    }
}

let handleReset = () => {
    document.getElementById('cells').innerHTML = ""
    document.getElementById('walls').innerHTML = ""
}

let state = 0
document.getElementById('algorithm').addEventListener('click', () => {
    state = ++state % 3
    switch (state) {
        case 0:
            document.documentElement.style.setProperty('--generating-algorithm', 'recursiveBacktracking')
            document.getElementById('algorithm').innerHTML = "<p>Recursive Backtracking <span>Algorithm</span></p>"
            break;
        case 1:
            document.documentElement.style.setProperty('--generating-algorithm', 'kruskals')
            document.getElementById('algorithm').innerHTML = "<p>Kruskal's <span>Algorithm</span></p>"
            break;
        case 2:
            document.documentElement.style.setProperty('--generating-algorithm', 'prims')
            document.getElementById('algorithm').innerHTML = "<p>Prim's <span>Algorithm</span></p>"
            break;
    }
})

let goGenerator = () => {
    document.getElementById('buttons-creator').classList.toggle('active')
    document.getElementById('buttons-generator').classList.toggle('active')
}

let backGenerator = () => {
    document.getElementById('buttons-creator').classList.toggle('active')
    document.getElementById('buttons-generator').classList.toggle('active')
}