let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

let getCurrentRootTransform = () => {
    return { tx: +getComputedStyle(document.documentElement).getPropertyValue('--current-translateX'),
        ty: +getComputedStyle(document.documentElement).getPropertyValue('--current-translateY'),
        sc: +getComputedStyle(document.documentElement).getPropertyValue('--current-scale') }
}

let getCurrentRootColors = () => {
    return {
    SL: getComputedStyle(document.documentElement).getPropertyValue('--secondaryL'),
    SM: getComputedStyle(document.documentElement).getPropertyValue('--secondaryM'),
    SD: getComputedStyle(document.documentElement).getPropertyValue('--secondaryD'),
    PL: getComputedStyle(document.documentElement).getPropertyValue('--primaryL'),
    PM: getComputedStyle(document.documentElement).getPropertyValue('--primaryM'),
    PD: getComputedStyle(document.documentElement).getPropertyValue('--primaryD'),
    W: getComputedStyle(document.documentElement).getPropertyValue('--white'),
    WD: getComputedStyle(document.documentElement).getPropertyValue('--whiteD'),
    DL: getComputedStyle(document.documentElement).getPropertyValue('--darkL'),
    DM: getComputedStyle(document.documentElement).getPropertyValue('--darkM'),
    DD: getComputedStyle(document.documentElement).getPropertyValue('--darkD')
    }
}

let getTranslatedPosition = (x, y) => {
    let values = getCurrentRootTransform()
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