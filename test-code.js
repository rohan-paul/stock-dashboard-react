// const moment = require("moment");

// const options = [
//   { symbol: "A", name: "Agilent Technologies Inc." },
//   { symbol: "AA", name: "Alcoa Corporation" }
// ].map(item => ({
//   value: item.symbol,
//   label: `${item.symbol} ${item.name}`
// }));
//
const options = [["2018-02-23", 183.29], ["2018-02-22", 178.99]];

console.log(options);

// const getXAxis = arr => {
//   let xAxisArr = [];
//   arr.map(i => {
//     if (Object.entries(i).length !== 0 && i.constructor === Object) {
//       xAxisArr.push(Object.values(i)[0]);
//     }
//   });
//   return xAxisArr;
// };
//
const getXAxis = arr => {
  let xAxisArr = [];
  arr.map(i => {
    if (Object.entries(i).length !== 0 && i.constructor === Object) {
      xAxisArr.push(Object.values(i)[0]);
    }
  });
  return xAxisArr;
};

console.log(getXAxis(options));

const getYAxis = arr => {
  let yAxisArr = [];
  arr.map(i => {
    if (Object.entries(i).length !== 0 && i.constructor === Object) {
      yAxisArr.push(Object.values(1)[0]);
    }
  });
  return yAxisArr;
};

console.log(getYAxis(options));

/*const returnLabel = stockSymbol => {
  return options.filter(i => {
    return i.value === stockSymbol;
  })[0].label;
  // return result
};

// const tickerSelectedByUser = options.filter(i => {
//   return i.value === "AA";
// })[0].label;

console.log(returnLabel("AA"));*/
