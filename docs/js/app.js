Array.prototype.flatten = function() {
  return this.reduce((memo, val) => memo.concat(val), []);
};

$(function() {
  $('[data-toggle="tooltip"]').tooltip();

  const partition = arr => discriminator =>
    arr.reduce(
      (memo, val) => {
        if (discriminator(val)) memo[0].push(val);
        else memo[1].push(val);

        return memo;
      },
      [[], []]
    );

  /**
   * Create a set of numbers in the given range
   * @param {number} start
   * @param {number} end
   */
  const range = (start, end) =>
    Array(end - start)
      .fill(0)
      .map((v, index) => index + start);

  /**
   *
   * @param {string} rangeString
   */
  const getRangeIndices = rangeString =>
    rangeString
      // ['0..10','100..150']
      .map(range => range.split('..'))
      // [['0','10'],['100','150']]
      .map(range => range.map(str => Number.parseInt(str, 10)))
      // [[0,10],[100,150]]
      .map(([start, end]) => range(start, end))
      .flatten();

  const setInitialValues = (/** @type {Array.<number>} */ arr) => (
    /** @type {Array.<number>} */ indices
  ) => arr.map(value => (indices.includes(value) ? 1 : 0));

  const mapInitialValues = (width, inputString) => {
    const ivArray = inputString.split(',');
    const [singles, ranges] = partition(ivArray)(
      val => val.indexOf('..') === -1
    );
    const rangeCells = getRangeIndices(ranges);
    const singleCells = singles.map(str => Number.parseInt(str, 10));
    const ivs = rangeCells.concat(singleCells);
    const numberedAr = Array(width)
      .fill(0)
      .map((v, index) => index);
    const initial = setInitialValues(numberedAr)(ivs);
    return initial;
  };

  $('#ca-configurator').on('submit', function(event) {
    event.preventDefault();
    const {
      on,
      off,
      rule,
      cawidth,
      generations,
      initial,
      cellsize,
      delay: pixelDelay
    } = event.target;
    const onColor = on.value;
    const offColor = off.value;
    const ruleNum = Number.parseInt(rule.value);
    const cellSize = Number.parseInt(cellsize.value);
    const width = Number.parseInt(cawidth.value) * cellSize;
    const height = Number.parseInt(generations.value) * cellSize;
    const delay = Number.parseInt(pixelDelay.value);
    const initialState = mapInitialValues(width, initial.value);
    const grid = new CAGrid(width, height, ruleNum, initialState, cellSize);

    const canvas = $('#sim-canvas');
    const context = canvas.get(0).getContext('2d');

    // Format canvas
    canvas.attr({ height: width, width: height });

    // Fill canvas with "off" color
    context.fillStyle = offColor;
    context.fillRect(0, 0, height, width);

    // Set canvas "on" color
    context.fillStyle = onColor;
    context.webkitImageSmoothingEnabled = false;

    // Draw CA
    grid.Draw(context, delay);

    $('.rule-row').remove();

    Object.keys(grid.Rule).forEach(ruleKey => {
      $('#rules-table').append(
        $('<tr />', { class: 'rule-row' })
          .append($('<td />', { text: ruleKey.replace(/,/g, '') }))
          .append($('<td />', { text: grid.Rule[ruleKey] ? '1' : '0' }))
      );
    });
  });
});
