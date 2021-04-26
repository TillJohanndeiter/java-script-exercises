/* Biggest number with less then 16 digits of catalan sequence. */

const SUM = (accumulator, currentValue) => accumulator + currentValue

catalanNumbers = [1]

n = 0
while (catalanNumbers[n].toString().length < 16) {

    let nextNumber = catalanNumbers.map((_, i) => {
        return catalanNumbers[catalanNumbers.length - 1 - i] * catalanNumbers[i]
    }).reduce(SUM)

    catalanNumbers.push(nextNumber)
    n++

}

console.log(catalanNumbers[n])