/* Recursive parser of a binary tree containing a mathematical theorem. */

const LEFT = 'left'
const RIGHT = 'right'
const VALUE = 'value'

const tree = {
    "value": "+",
    "left": {
        "value": "/",
        "left": {
            "value": "20"
        },
        "right": {
            "value": "10"
        }
    },
    "right": {
        "value": "13"
    }
}


const evalNode = node => {
    if (node[LEFT] === undefined && node[RIGHT] === undefined) {
        return Number(node[VALUE])
    }
    switch (node[VALUE]) {
        case '+':
            return evalNode(node[LEFT]) + evalNode(node[RIGHT])
        case '-':
            return evalNode(node[LEFT]) - evalNode(node[RIGHT])
        case '*':
            return evalNode(node[LEFT]) * evalNode(node[RIGHT])
        case '/':
            return evalNode(node[LEFT]) / evalNode(node[RIGHT])
        default:
            new Error('Invalid Operation: ' + node[VALUE])
    }
}


console.log(evalNode(tree))