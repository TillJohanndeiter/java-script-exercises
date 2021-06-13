/* Find the first balanced primes of order 1,2,3 and 4.  */

const LIMIT = 100_000_000
const K = 4


let genPrimeTable = n => {
    let table = {0: false, 1: false}

    for (let i = 2; i < n; i++) {
        table[i] = true
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (table[i]) {
            for (let j = i * i; j < n; j += i) {
                table[j] = false
            }
        }
    }

    let primes = []

    for (let i = 0; i < n; i++) {
        if (table[i]) {
            primes.push(i)
        }
    }

    return primes
}
const avgOfKNeighbours = (arr, i, k) => {
    let sumNeighbours = 0
    for (let j = 1; j <= k; j++) {
        sumNeighbours += arr[i + k]
        sumNeighbours += arr[i - k]
    }

    return sumNeighbours / (2 * k)
}


const primes = genPrimeTable(LIMIT)


const findBalancedPrime = (k, list) => {
    for (let i = k; i < primes.length - k; i++) {
        let avg = avgOfKNeighbours(primes, i, k)
        if (primes[i] === avg) {
            list.push(primes[i])
        }
    }
}


function histogram(arr) {
    return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
}


let balancedPrimes = []

for (let k = 1; k <= K; k++) {
    findBalancedPrime(k, balancedPrimes)
}

let occurrence = histogram(balancedPrimes)

console.log(Object.keys(occurrence).filter(key => occurrence[key] === K))