$(function() {
  // Set up tooltip
  $('[data-toggle="tooltip"]').tooltip()

  $('#ca-configurator').on('submit', function(event) {
    event.preventDefault()
    let form = event.target
    let onColor = form.on.value
    let offColor = form.off.value
    let ruleNum = Number.parseInt(form.rule.value)
    let width = Number.parseInt(form.width.value)
    let generations = Number.parseInt(form.generations.value)
    let initial = form.initial.value.split(',').reduce((memo, val) => {
      if (val.indexOf('..') !== -1) {
        let params = val.split('..').map(param => Number.parseInt(param))
        if (params.length !== 2) throw new Error('Syntax error near ' + val)
        for (let i = params[0]; i <= params[1]; i++) memo.push(i)
      } else memo.push(Number.parseInt(val))
      return memo
    }, [])

    const grid = new CAGrid(width, generations, ruleNum, initial)

    // $('#sim-table').html(grid.GridString)
    let canvas = $('#sim-canvas')

    let context = canvas.get(0).getContext('2d')

    // Format canvas
    canvas.attr({ height: generations, width: width })

    // Fill canvas with "off" color
    context.fillStyle = offColor
    context.fillRect(0, 0, width, generations)

    // Set canvas "on" color
    context.fillStyle = onColor
    context.webkitImageSmoothingEnabled = false

    // Draw CA
    grid.DrawGrid(context)

    $('.rule-row').remove()
    Object.keys(grid.Rule).forEach(ruleKey => {
        $('#rules-table').append(
            $('<tr />', { class: 'rule-row' })
                .append($('<td />', { text: ruleKey.replace(/,/g, '') }))
                .append($('<td />', { text: grid.Rule[ruleKey]? '1': '0' }))
        )
    })
  })
})
