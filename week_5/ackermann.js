const M = 3
const N = 12
const ackermannRec = (m, n) => (m === 0) ? n + 1 : (n === 0) ? ackermannRec(m - 1, 1) : ackermannRec(m - 1, ackermannRec(m, n - 1))

function ackermannMoreItt(m, n) {
    while (m !== 0) {
        if (n === 0) {
            n = 1
        } else {
            n = ackermannMoreItt(m, n - 1)
        }
        m--
    }

    return n + 1
}

function ackermanPureItt(m, n) {
    let values = {}
    let recDepth = 0

    while (true) {
        if (m === 0) {
            n++
            if (recDepth === 0) {
                break
            }
            recDepth--
            m = values[recDepth]
        } else if (n === 0) {
            m--
            n = 1
        } else {
            values[recDepth] = m - 1
            recDepth++
            n--
        }

    }

    return n
}

try {
    console.log(ackermannRec(M, N))
} catch (e) {
    if (e instanceof RangeError) {
        console.log('Recursive implementation exceeded stack size')
    } else {
        throw e
    }
}

try {
    console.log(ackermannMoreItt(M, N))
} catch (e) {
    if (e instanceof RangeError) {
        console.log('More iterative implementation exceeded stack size')
    } else {
        throw e
    }
}

console.log(ackermanPureItt(M, N))