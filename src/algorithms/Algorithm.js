export class Algorithm {
    animation = () => {
        let end = this.step()
        console.log('aa')
        if (end || this.stop) return
        setTimeout(_ => requestAnimationFrame(this.animation), 30)
    }
    start = _ => requestAnimationFrame(this.animation)
}
