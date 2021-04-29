/* Find all magic cuboid. That means a 2D-matrix with equal cumulated rows, columns and diagonals */

NUM = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const sumOfRow = (array, column) => {
    let sum = 0
    for (let i = column; i < array.length; i += 3) {
        sum += array[i]
    }

    return sum
}


const sumOfColumn = (array, row) => {
    let sum = 0
    for (let i = 0; i < 3; i++) {
        sum += array[row * 3 + i]
    }

    return sum
}

const sumOfRightDiagonal = (array) => array[0] + array[4] + array[8]
const sumOfLeftDiagonal = (array) => array[2] + array[4] + array[6]

function printCuboid(array) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            process.stdout.write(array[3 * i + j].toString())
        }
        console.log('')
    }
    console.log('')
}


// https://javascript.plainenglish.io/how-to-solve-permutations-in-javascript-502cc4522482
const allPermutations = (nums) => {
    const permutations = [];

    const recPermutations = (nums, permutation) => {
        if (permutation.length === nums.length) {
            permutations.push([...permutation]);
            return;
        }

        for (const num of nums.filter(num => !permutation.includes(num))) {
            permutation.push(num);
            recPermutations(nums, permutation);
            permutation.pop();
        }
    };

    recPermutations(nums, []);
    return permutations;
};

for (let per of allPermutations(NUM)) {
    const diffValues = new Set([sumOfRow(per, 0), sumOfRow(per, 1), sumOfRow(per, 2),
        sumOfColumn(per, 0), sumOfColumn(per, 1), sumOfColumn(per, 2),
        sumOfRightDiagonal(per), sumOfLeftDiagonal(per)])

    if (diffValues.size === 1) {
        printCuboid(per)
    }
}