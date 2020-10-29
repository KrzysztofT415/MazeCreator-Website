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
            break;
        case 'draw':
            document.getElementById('erase').classList.remove('chosen')
            document.getElementById('draw').classList.add('chosen')
            document.getElementById('grid').classList.add('drawing')
            break;
    }
}

let handleReset = () => {
    document.getElementById('cells').innerHTML = ""
    document.getElementById('walls').innerHTML = ""
}