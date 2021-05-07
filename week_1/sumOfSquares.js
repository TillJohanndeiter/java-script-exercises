/* Difference of square of sum and sum of square of integers from 1 to 100. */

// https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
function range(start, end) {
    return Array.from({length: end - start + 1}, (_, i) => i)
}


// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
const sum = (accumulator, currentValue) => accumulator + currentValue


N = 100
RANGE = range(1, N + 1)
sumOfSquares = RANGE.map(x => Math.pow(x, 2)).reduce(sum)
squareOfSum = Math.pow(RANGE.reduce(sum), 2)
console.log(squareOfSum - sumOfSquares)