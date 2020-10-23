window.onload = function() {
  createButtons()
  generateGrid()
}

function createButtons() {
  let toolbar = document.getElementById('toolbar');

  let buttonNames = ['start','stop','reset'];

  buttonNames.forEach(name => {
    let button = document.createElement('a');
    button.href = '#';
    button.innerText = name;

    toolbar.appendChild(button);

    button.addEventListener('click', function(e) {
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;

      console.log(x,y)

      let animation = document.createElement('span');
      animation.style.left = x + 'px';
      animation.style.top = y + 'px';
      button.appendChild(animation);

      setTimeout(() => {
        animation.remove()
      }, 1000);
    });
  });
}

function generateGrid() {
  let grid = document.getElementById('grid');
  let width = 42
  let height = 15

  let hexes = [...Array(width).keys()].map(
      x => x = [...Array(height).keys()].map(
          function (y) {
            y -= Math.floor(x / 2)
            let cell = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
            let hex = new Hex(x, y, cell)
            cell.setAttribute('points', hex.corners.reduce((acc, v) => acc + ' ' + v.toString()))
            cell.classList.add('q' + x, 'r' + y, 'q' + (x % 2 !== 0 ? 'odd' : 'even'), 'r' + (y % 2 !== 0 ? 'odd' : 'even'), 'status-empty')
            grid.appendChild(cell)
            return hex;
          }
      )
  )
  grid.addEventListener('mousedown', function () {
    grid.addEventListener('mousemove', handleDrag)
    grid.addEventListener('mouseup', e => handleUp(grid))
  })
}

let handleDrag = function () {
  let cell = document.querySelectorAll("polygon:hover")
  cell = cell[cell.length - 1]

  if (cell !== undefined && cell.classList.contains('status-empty')) {
    cell.animate([
      {
        transform: 'translate(10px, 10px)',
        fill: 'white',
        opacity: '0%'
      },
      {
        transform: 'translate(0, 0)',
        fill: 'white',
        opacity: '100%'
      }], {
      duration: 200,
      iterations: 1
    });
    cell.classList.remove('status-empty')
    cell.classList.add('status-wall')
  }
}

function handleUp(grid) {
  grid.removeEventListener('mousemove', handleDrag)
  grid.removeEventListener('mouseup', this)
}

// let height = Math.floor(grid.clientHeight / 25) + 1;
// let width = Math.floor(grid.clientWidth / 25);
// console.log(height, width);
//
// for (let i = 0; i < width; ++i) {
//   let newRow = document.createElement("div");
//   newRow.classList.add("row");
//   for (let i = 0; i < height; i++) {
//     let newHex = document.createElement("div");
//     newHex.classList.add("hexagon");
//     newHex.classList.add("yellow");
//     newRow.appendChild(newHex);
//   }
//   grid.append(newRow);
// }
//
// grid.ondragstart = function() {
//   console.log("hej");
//   for (let i = 0; i < grid.children.length; ++i) {
//     grid.children[i].ondragenter = function() {
//       grid.children[i].classList.remove("yellow");
//       grid.children[i].classList.add("red");
//     };
//   }
// };