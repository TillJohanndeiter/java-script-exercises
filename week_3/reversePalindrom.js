/* Remove all substrings from text, which are equal to his inverted and reverted sequence.
Inverted means that each character of the substring get inverted. E.g A → Z, B → Y, Y → B,  Z → A.  */

const invertNum = a => (27 - a) % 27
const invertCharacter = c => String.fromCharCode(invertNum(c.charCodeAt(0) - 64) + 64)
const complementString = str => str.split('').map(c => invertCharacter(c)).join('')
const reverseStr = str => str.split('').reverse().join('')

function getAllSubstrings(str) {
    let result = []
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            result.push(str.slice(i, j))
        }
    }

    return result
}

let text = "SJFUQPKMNPIYDWBENBYMGKOLPEDQGGTTJWLUPIYZTGABRKFBAZIKPLZAD"
let allSubstrings = getAllSubstrings(text)

for (const subStr of allSubstrings) {
    if (subStr === reverseStr(complementString(subStr))) {
        text = text.replace(subStr, '')
    }

}

console.log(text)