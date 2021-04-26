/* Extract characters of TEXT with prime indices. */

const TEXT = 'NILYOKVMXQEYPTIYRKIOFQMPMWFDZKAXBZPFHQYELGEIOUNYGJ'

function isPrime(x) {
    if (x < 2) {
        return false
    }

    for (var i = 2; i <= Math.sqrt(x); i++) {
        if (x % i === 0)
            return false
    }

    return true

}

console.log(Array.from(TEXT).filter((c, i) => isPrime(i + 1)).join(''))