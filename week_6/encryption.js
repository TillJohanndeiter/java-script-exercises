/* Encryption of WORD. */
const WORD = 'YBPNIHVYSQXQNEIALTENWSEDIYYPDBDWSTGNB'
const SEED = 13
const ASCI_OFFSET = 65
const SPACE_NUM = 26

const charToNum = c => {
    if (c === ' ') {
        return SPACE_NUM
    } else {
        return c.charCodeAt(0) - ASCI_OFFSET
    }
}

const numTpChar = n => {
    if (n === SPACE_NUM) {
        return ' '
    } else {
        return String.fromCharCode(n + ASCI_OFFSET)
    }
}

const strToNumArray = str => str.split('').map(c => charToNum(c))
const numToStr = numArr => numArr.map(n => numTpChar(n)).join('')


const decrypt = (numArray, i, seed) => {
    if (i === 0) {
        numArray[i] = (26 + numArray[i] - seed) % 27
    } else {
        numArray[i] = (26 + numArray[i] - decrypt(numArray, i - 1, seed)) % 27
    }

    return numArray[i]
}


let numArray = strToNumArray(WORD)
decrypt(numArray, numArray.length - 1, SEED)
console.log(numToStr(numArray))