$(function() {
    $('#ca-configurator').on('submit', function(event) {
        event.preventDefault()
        let form = event.target
        let onChar = form.on.value
        let offChar = form.off.value
        let ruleNum = Number.parseInt(form.rule.value)
        let width = Number.parseInt(form.width.value)
        let generations = Number.parseInt(form.generations.value)

        console.log(`on: ${onChar}, off: ${offChar}, rule: ${ruleNum}, width: ${width}, generations: ${generations}`)

        const grid = new CAGrid(width, generations, ruleNum)
        console.log(grid.Rule)

        $('#sim-table').html(grid.GridText(offChar, onChar))
    })
})
