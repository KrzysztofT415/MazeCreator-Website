let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

let getCurrentRootProperties = () => {
    return { tx: +getComputedStyle(document.documentElement).getPropertyValue('--current-translateX'),
        ty: +getComputedStyle(document.documentElement).getPropertyValue('--current-translateY'),
        sc: +getComputedStyle(document.documentElement).getPropertyValue('--current-scale') }
}

let getTranslatedPosition = (x, y) => {
    let values = getCurrentRootProperties()
    return {x: (x - values.tx) / values.sc, y: (y - values.ty) / values.sc}
}

let shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = getRandomInt(0, (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

let deleteFromArray = (array, element) => {
    return array.filter(v => v !== element)
}

let getElementIfExists = (array, element) => {
    return array.filter(v => v === element)[0]
}