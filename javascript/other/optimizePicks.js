const MINIMUM_NUMBER_OF_PICKS = 1;

const sumOf = (input = []) => input.reduce((previousValue, currentValue) => previousValue + currentValue, 0)

const getCurrentAllocation = (input = []) => sumOf(
    input.map((current) => current[0] * current[1])
);

const prettyPrint = (input, remainder) => {
  const results = input.map(row => row[1]);
  return [...results, remainder];
}

const handleFractionalPicks = (input, remainder) => {
  let results = [];

  for (let i = 0; i < input.length; i++) {
    const price = input[i][0]; const percentage = input[i][1];
    let allocation = remainder * percentage;
    let quantity = Math.floor(Math.trunc(allocation / price));
    if (quantity <= 0) quantity = allocation / price;
    results[i] = [price, quantity];
  }
   
  remainder -= Math.floor(Math.trunc(getCurrentAllocation(results)));
  
  return prettyPrint(results, remainder)
}

const handleWholePicks = (input, remainder) => {
  let results = [];

  for (let i = 0; i < input.length; i++) {
    const price = input[i][0]; const percentage = input[i][1];
    let allocation = remainder * percentage;
    let quantity = Math.floor(Math.trunc(allocation / price));    
    results[i] = [price, quantity];
  }

  console.log(results)

  remainder -= getCurrentAllocation(results);

  for (let i = 0; i < results.length; i++) {
    const price = results[i][0]; const quantity = results[i][1];
    
    if (quantity < MINIMUM_NUMBER_OF_PICKS) {
      if (remainder >= price) {
        remainder -= price;
        results[i][1] = quantity + 1;
      } else {
        results[i][1] = quantity;
        break;
      }
    } else {
      results[i][1] = quantity;
    }
  }

  while (true) {
    const randomRowIndex = Math.floor(Math.random() * results.length);
    const randomRow = results[randomRowIndex];
    const price = randomRow[0]; const quantity = randomRow[1];

    if ((remainder - price) >= 0) {
      remainder -= price;
      results[randomRowIndex][1] = quantity + 1;
    } else {
      break;
    }
  }

  if (remainder > 0) {
    for (let i = 0; i < results.length; i++) {
        const price = results[i][0]; const quantity = results[i][1];
        
        if ((remainder - price) >= 0) {
          remainder -= price;
          results[i][1] = quantity + 1;
        }
    }
  }

  return prettyPrint(results, remainder)
}

function OPTIMIZE_PICKS(input, remainder, canChooseFractionalPicks) {
  const results = canChooseFractionalPicks ?
    handleFractionalPicks(input, remainder) :
    handleWholePicks(input, remainder);
  
  return ['Optimize Picks', ...results]
}

function AVERAGE_BY_PERCENTAGE(input) {
  return sumOf(input.map(([value, percentage]) => value * percentage))
}

// console.log(OPTIMIZE_PICKS([
//   [411.18, .28],
//   [231.57, .14],
//   [248.47, .07],
//   [274.61, .07],
//   [227.01, .07],
//   [112.19, .07],
//   [62.55, .06],
//   [64.98, .06],
//   [51.73, .03],
//   [38.47, .03],
//   [137.49, .03],
//   [75.8, .03],
//   [75.19, .03],
//   [59.99, .03]
// ], 50000, false));

// console.log(OPTIMIZE_PICKS([
//   [50000.00, .7],
//   [2000.00, .3]
// ], 1000, true));

// console.log(AVERAGE_BY_PERCENTAGE([[0.45, 1]]));
