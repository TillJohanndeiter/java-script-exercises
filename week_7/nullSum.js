/* Find indices of longest sum in list equal to zero and calculate product of indices. */


const product = (product, currentValue) => product * currentValue

const longestSumEqualToZero = list => {

    let indices = [-1, -1]
    for (let start = 0; start < list.length; start++) {
        let sum = 0
        for (let end = start; end < list.length; end++) {
            sum += list[end]

            if (sum === 0) {
                let span = end - start
                if (span > indices[1] - indices[0]) {
                    indices[0] = start
                    indices[1] = end
                }

            }

        }

    }

    return indices
}


let list = [1, 1, -1, 1, 1, 5, 2, 3, -5, 0]
let [start, end] = longestSumEqualToZero(list)
console.log([start, end])
console.log(start * end)