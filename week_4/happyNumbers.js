/* Number of happy numbers smaller than 1000000*/
const LIMIT = 1000000

function range(from, to) {
    let range = []
    for (let i = from; i < to; i++) {
        range.push(i)
    }
    return range
}

let happyNums = range(1, LIMIT)
let nextNumber = 1
while (nextNumber < happyNums.length) {
    nextNumber = happyNums.find(el => el > nextNumber)
    happyNums = happyNums.filter((el, index) => (index + 1) % nextNumber !== 0)
}

console.log(happyNums.length)