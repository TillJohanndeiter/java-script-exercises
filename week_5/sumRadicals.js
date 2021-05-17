/* Sum of radicals of all numbers below 100.000 */
const LIMIT = 100000

class PrimeFactor {
    constructor(number, occurrence) {
        this._number = number;
        this._occurence = occurrence;
    }

    get occurrence() {
        return this._occurence;
    }

    get number() {
        return this._number
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

    while (num % 2 === 0) {
        num /= 2
        addToFactorHist(2)
    }


    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            num /= i
            addToFactorHist(i)
        }
    }

    if (num > 2) {
        addToFactorHist(num)
    }

    let primFactors = []

    for (const primeFactor in factorHist) {
        primFactors.push(new PrimeFactor(primeFactor, factorHist[primeFactor]))
    }
    return primFactors
}


const product = (product, primFactor) => product * primFactor.number
const radical = n => primFactors(n).reduce(product, 1)


let sumOfRadicals = 0

for (let i = 1; i <= LIMIT; i++) {
    sumOfRadicals += radical(i)
}

console.log(sumOfRadicals)