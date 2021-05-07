/* Find Row n in the floyd triangle with sum equal to X. Then calculate the sum of n-th (55) row in the pascal
triangle.*/

const X = 83215

const sum = (accumulator, currentValue) => accumulator + currentValue
const gaussianSum = n => (Math.pow(n, 2) + n) / 2
const sumRowFloydTriangle = (row) => gaussianSum(gaussianSum(row)) - gaussianSum(gaussianSum(row - 1))

const pascalTriangleUpTo = (rowUpTO) => {
    let rows = [[1], [1, 1]]
    for (let row = 2; row < rowUpTO; row++) {
        let rowValues = []
        for (let column = 0; column <= row; column++) {

            if (column === 0 || column === row) {
                rowValues.push(1)
            } else {
                rowValues.push(rows[row - 1][column - 1] +
                    rows[row - 1][column])
            }
        }
        rows.push(rowValues)
    }
    return rows
}


let row = 1

while (sumRowFloydTriangle(row) !== X) {
    row++
}

let pascalRows = pascalTriangleUpTo(row)
console.log('Row: ', row)
console.log('Sum:', pascalRows[pascalRows.length - 1].reduce(sum))
