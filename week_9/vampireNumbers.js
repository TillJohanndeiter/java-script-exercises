const numToDigitArray = n => n.toString().split('').map(i => i)
const digitArrayToNum = arr => Number(arr.join(''))
const areArraysEqual = (a, b) => a.length === b.length && a.every(value => b.includes(value));

function permute(strArray, maxLength) {

    let result = []

    const rec_permute = (arr, permutation = []) => {

        if (arr.length === maxLength) {
            result.push(permutation)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice()
                let next = curr.splice(i, 1)
                rec_permute(curr.slice(), permutation.concat(next))
            }
        }

    }

    rec_permute(strArray);
    return result
}


const isVampire = n => {
    let strArr = numToDigitArray(n)

    if (strArr.length % 2 !== 0) {
        return false
    }

    let allCombinations = permute(strArr, 0)
    allCombinations = allCombinations.map(arr =>
        [digitArrayToNum(arr.slice(0, arr.length / 2)), digitArrayToNum(arr.slice(-arr.length / 2))])

    let vampireComb = []

    for (let comb of allCombinations) {
        if (comb[0] !== comb[1] && comb[0] * comb[1] === n && vampireComb.every(otherComb => !areArraysEqual(comb, otherComb))) {
            vampireComb.push(comb)
        }
    }

    let temp = vampireComb.length === 2

    if (temp) {
        console.log('asdsa')
    }

    return temp
}


let i = 1
while (true) {
    if (isVampire(i)) {
        console.log(i)
        break

    }
    i++
}