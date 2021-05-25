/* Sum of minimal primes below 1 000 000. */

const LIMIT = 1_000_000

let genPrimeTable = n => {
    let table = []
    table.push(false)
    table.push(false)
    for (let i = 2; i < n; i++) {
        table.push(true)
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (table[i]) {
            for (let j = i * i; j < n; j += i) {
                table[j] = false
            }
        }
    }

    return table
}

const primeTable = genPrimeTable(LIMIT)

function getAllCombinations(strArr) {
    let results = new Set()
    const recCombinations = (strArr) => {


        for (let i = 0; i < strArr.length; i++) {
            let strArrForRec = [...strArr]
            strArrForRec.splice(i, 1)
            results.add(Number(strArrForRec.join('')))
            if (strArrForRec.length > 1) {
                recCombinations(strArrForRec)
            }
        }

    }

    recCombinations(strArr)

    return results
}

function isMinPrime(n) {
    let combs = getAllCombinations(String(n).split(''))

    for (const comb of combs) {
        if (primeTable[comb]) {
            return false
        }
    }

    return true
}


let sum = 0

for (let n = 2; n < LIMIT; n++) {
    if (primeTable[n] && isMinPrime(n)) {
        sum += n
    }
}

console.log(sum)