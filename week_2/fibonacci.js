/* Fibonacci number smaller than 1 Billion with the most Fibonacci dividers. */

const LIMIT = 100000000000000 // 1 Billion
const math_fkt = (list, el) => list.filter(a => el % a === 0).length

function fibUpTo(limit) {
    let fibs = [1, 1]
    while (fibs[fibs.length - 1] < limit) {
        fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2])
    }
    return fibs
}

function createHistogram(list, mathFkt) {
    const histogram = {};
    for (const el of list) {
        histogram[el] = mathFkt(list, el)
    }

    return histogram
}

fibs = fibUpTo(LIMIT)
histogram = createHistogram(fibs, math_fkt)

entries = Object.entries(histogram)
console.log(entries.sort((a, b) => b[1] - a[1])[0])
