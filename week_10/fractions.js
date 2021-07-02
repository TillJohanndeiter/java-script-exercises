/*  Sum of all z of all z/n with z < n, n <= 1000 and gcd(z,n) == 1 */
const LIMIT = 1001

const sum = (accumulator, currentValue) => accumulator + currentValue[0]

function* range(from, upTo) {
    for (let i = from; i < upTo; i++) {
        yield i
    }
}


function ggt(z, n) {

    if (z === 0) {
        return n
    } else {
        while (n !== 0) {
            if (z > n) {
                z -= n
            } else {
                n -= z
            }
        }
        return z
    }
}


let uniqueFractions = []

for (let n = 0; n < LIMIT; n++) {
    for (let z of range(1, n)) {
        if (ggt(z,n) === 1) {
            uniqueFractions.push([z, n])
        }
    }
}

console.log(uniqueFractions.reduce(sum, 0))