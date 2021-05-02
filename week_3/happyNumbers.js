/* Number of happy numbers below 10 million. */
const SUM = (accumulator, currentValue) => accumulator + currentValue
const CALC_NEXT_NUMBER = n => n.toString().split('').map(c => Math.pow(parseInt(c), 2)).reduce(SUM)
const LIMIT = 10000000

let numOfHappy = 0

for (let i = 1; i < LIMIT; i++) {
    const sequence = [i]

    while (true) {
        const nextNumber = CALC_NEXT_NUMBER(sequence[sequence.length - 1])
        if (nextNumber === 1) {
            numOfHappy++
            break
        }
        if (nextNumber === 4) {
            break
        }
        sequence.push(nextNumber)
    }

}

console.log(numOfHappy)