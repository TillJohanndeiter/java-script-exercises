/* Sudoku solver. Backtracking approach. */

const NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const numUseInRow = (sudoku, rowIdx) => sudoku[rowIdx].filter(x => x !== 0)

const numUseInColumn = (sudoku, columnIdx) => {
    let numInCol = []
    for (let i = 0; i < sudoku.length; i++) {
        if (sudoku[i][columnIdx] !== 0) {
            numInCol.push(sudoku[i][columnIdx])
        }

    }

    return numInCol
}


const numUseInQuader = (sudoku, rowIdx, columnIdx) => {
    let startRowIdx = 3 * Math.floor(rowIdx / 3)
    let startColIdx = 3 * Math.floor(columnIdx / 3)

    let numInQuader = []

    for (let i = startRowIdx; i < startRowIdx + 3; i++) {
        for (let j = startColIdx; j < startColIdx + 3; j++) {
            if (sudoku[i][j] !== 0) {
                numInQuader.push(sudoku[i][j])
            }
        }
    }

    return numInQuader
}

function validNumbers(sudoku, rowIdx, columnIdx) {
    return NUMS.filter(n => !numUseInRow(sudoku, rowIdx).includes(n)
        && !numUseInColumn(sudoku, columnIdx).includes(n)
        && !numUseInQuader(sudoku, rowIdx, columnIdx).includes(n))
}

function bruteForce(sudoku) {


    let solutions = []

    const rec_bruteForce = (sudoku, rowIdx, columnIdx) => {


        let valid_nums
        if (sudoku[rowIdx][columnIdx] === 0) {
            valid_nums = validNumbers(sudoku, rowIdx, columnIdx);
        } else {
            valid_nums = [sudoku[rowIdx][columnIdx]]
        }


        for (let valid_num of valid_nums) {

            let clone = sudoku.map(row => row.slice())
            clone[rowIdx][columnIdx] = valid_num

            if (rowIdx === 8 && columnIdx === 8) {
                solutions.push(clone)
            } else if (columnIdx === 8) {
                rec_bruteForce(clone, rowIdx + 1, 0)
            } else {
                rec_bruteForce(clone, rowIdx, columnIdx + 1)

            }

        }

    }

    rec_bruteForce(sudoku, 0, 0)

    return solutions

}

let fs = require('fs')
let sudoku = JSON.parse(fs.readFileSync('sudoku.json', 'utf8'))


let solution = bruteForce(sudoku)[0]

let number = ""
for (let i = 0; i < 9; i++) {
    number += solution[i][i]
}

console.log(number)
