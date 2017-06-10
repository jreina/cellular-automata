$(function() {
    $('#ca-configurator').on('submit', function(event) {
        event.preventDefault()
        let form = event.target
        let onChar = form.on.value
        let offChar = form.off.value
        let ruleNum = Number.parseInt(form.rule.value)
        let width = Number.parseInt(form.width.value)
        let generations = Number.parseInt(form.generations.value)

        const grid = new CAGrid(width, generations, ruleNum)

        $('#sim-table').html(grid.GridText(offChar, onChar))
    })
})
