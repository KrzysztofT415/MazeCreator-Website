let handleReset = function () {
    let cells = document.getElementsByTagName('polygon')
    for (let i = 0; i < cells.length; i++) {
        let item = cells.item(i)
        if (!item.classList.contains('status-empty')) {
            item.classList.remove('status-%')
            item.classList.add('status-empty')
        }
    }
}