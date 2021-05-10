/* Decode of godelizated number. */

const NUMBER = 8515841215550500262534435983514954566633469175071711107775526441643558277110411969873680306754437414445721089366150727232650858346369111136148412000000000000000000n
const numToChar = n => String.fromCharCode((n % 27) + 64)

const bigIntSqrt = (bigInt) => {
    let oldValue = 0
    let sqrt = bigInt
    while (sqrt ** 2n !== 2n && sqrt !== oldValue) {
        oldValue = sqrt
        sqrt = (oldValue + bigInt / oldValue) / 2n
    }
    return sqrt
}


function isPrime(x) {
    if (x < 2) {
        return false
    }

    for (let i = 2; i <= Math.sqrt(x); i++) {
        if (x % i === 0)
            return false
    }

    return true

}

function firstNPrimes() {
    let primes = []
    let i = 2
    while (primes.length <= 26) {
        if (isPrime(i)) {
            primes.push(BigInt(i))
        }
        i++
    }
    return primes;
}

class PrimeFactor {
    constructor(number, occurence) {
        this._number = number;
        this._occurence = occurence;
    }

    get occurrence() {
        return this._occurence;
    }
}


function primFactors(num) {
    let factorHist = {}

    function addToFactorHist(primeFactor) {
        if (typeof factorHist[primeFactor] == "undefined") {
            factorHist[primeFactor] = 1
        } else {
            factorHist[primeFactor]++
        }
    }

    while (num % 2n === 0n) {
        num /= 2n
        addToFactorHist(2)
    }


    for (let i = 3; i < bigIntSqrt(num); i += 2) {
        while (num % BigInt(i) === 0n) {
            num /= BigInt(i)
            addToFactorHist(i)
        }
    }

    let primFactors = []

    for (const primeFactor in factorHist) {
        primFactors.push(new PrimeFactor(primeFactor, factorHist[primeFactor]))
    }
    return primFactors
}

const primes = firstNPrimes();

console.log(primFactors(NUMBER, primes).map(primeFactor => numToChar(primeFactor.occurence)).join(''))