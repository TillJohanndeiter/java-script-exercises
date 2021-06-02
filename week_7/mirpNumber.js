const LIMIT = 1_000_000
const revertNumber = n => Number(n.toString().split('').reverse().join(''))
const sumOfDigits = n => n.toString().split('').map(Number).reduce((sum, currentValue) => sum + currentValue)

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

    return [table, primes]
}

const [table, primes] = genPrimeTable(LIMIT)

const isMirpNumber = n => table[n] && table[revertNumber(n)] && revertNumber(n) !== n

let sumOfMirrorPrimes = 0

primes.forEach((n, i) => {
    if (isMirpNumber(n) && isMirpNumber(i + 1) && isMirpNumber(sumOfDigits(n))) {
        sumOfMirrorPrimes += n
    }
})


console.log(sumOfMirrorPrimes)