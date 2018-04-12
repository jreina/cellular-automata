$(function() {
  const bucket = arr => discriminator =>
    arr.reduce(
      (memo, val) => {
        if (discriminator(val)) memo[0].push(val);
        else memo[1].push(val);

        return memo;
      },
      [[], []]
    );
  const getRangeIndices = rangeString =>
    rangeString
      // ['0..10','100..150']
      .map(range => range.split(".."))
      // [['0','10'],['100','150']]
      .map(range => range.map(str => Number.parseInt(str, 10)))
      // [[0,10],[100,150]]
      .map(range => {
        const [start, end] = range;
        const length = end - start;
        return Array(length)
          .fill(0)
          .map((v, index) => index)
          .map(value => value + start);
      });
  const setInitialValues = arr => indices =>
    arr.map(value => (indices.includes(value) ? 1 : 0));
  const mapInitialValues = (width, inputString) => {
    const ivArray = inputString.split(",");
    const [singles, ranges] = bucket(ivArray)(val => val.indexOf("..") === -1);
    const rangeCells = getRangeIndices(ranges);
    const singleCells = singles.map(Number.parseInt);
    const ivs = rangeCells.concat(singleCells);
    const numberedAr = Array(width)
      .fill(0)
      .map((v, index) => index);
    const initial = setInitialValues(numberedAr)(ivs);
    return initial;
  };

  $("#ca-configurator").on("submit", function(event) {
    event.preventDefault();
    const {
      on,
      off,
      rule,
      cawidth,
      generations,
      initial,
      cellsize
    } = event.target;
    const onColor = on.value;
    const offColor = off.value;
    const ruleNum = Number.parseInt(rule.value);
    const cellSize = Number.parseInt(cellsize.value);
    const width = Number.parseInt(cawidth.value) * cellSize;
    const height = Number.parseInt(generations.value) * cellSize;
    const initialState = mapInitialValues(width, initial.value);
    const grid = new CAGrid(width, height, ruleNum, initialState, cellSize);

    const canvas = $("#sim-canvas");
    const context = canvas.get(0).getContext("2d");

    // Format canvas
    canvas.attr({ height, width });

    // Fill canvas with "off" color
    context.fillStyle = offColor;
    context.fillRect(0, 0, width, height);

    // Set canvas "on" color
    context.fillStyle = onColor;
    context.webkitImageSmoothingEnabled = false;

    // Draw CA
    grid.DrawGrid(context);

    $(".rule-row").remove();

    Object.keys(grid.Rule).forEach(ruleKey => {
      $("#rules-table").append(
        $("<tr />", { class: "rule-row" })
          .append($("<td />", { text: ruleKey.replace(/,/g, "") }))
          .append($("<td />", { text: grid.Rule[ruleKey] ? "1" : "0" }))
      );
    });
  });
});
