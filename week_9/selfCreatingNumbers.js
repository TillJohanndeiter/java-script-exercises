const LIMIT = 1_000_000


const sum = (accumulator, currentValue) => accumulator + currentValue
const numToDigitArray = n => n.toString().split('').map(i => Number(i))

// https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
function range(start, end) {
    return Array.from({length: end - start + 1}, (_, i) => i)
}

function isSelfCreating(n) {
    let series = numToDigitArray(n)
    let numLastDigits = series.length

    let nextNumber = 0
    while (nextNumber < LIMIT) {
        nextNumber = series.slice(-numLastDigits).reduce(sum)
        series.push(nextNumber)

        if (nextNumber === n) {
            return true
        }
    }

    return false

}

let sumOfSelfCreating = range(0, LIMIT).filter(n => isSelfCreating(n)).reduce(sum)

console.log(sumOfSelfCreating)