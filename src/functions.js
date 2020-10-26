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