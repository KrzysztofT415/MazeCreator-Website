export const getCurrentRootTransform = () => [
    +getComputedStyle(document.documentElement).getPropertyValue('--current-translateX'),
    +getComputedStyle(document.documentElement).getPropertyValue('--current-translateY'),
    +getComputedStyle(document.documentElement).getPropertyValue('--current-scale')] // prettier-ignore

export const getCurrentRootColors = () => {
    return {
        SLE: getComputedStyle(document.documentElement).getPropertyValue('--secondaryLE'),
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

export const getTranslatedPosition = (x, y) => {
    let [tx, ty, sc] = getCurrentRootTransform()
    return [(x - tx) / sc, (y - ty) / sc]
}

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

export const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; --i) {
        let j = getRandomInt(0, i + 1)
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}
