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