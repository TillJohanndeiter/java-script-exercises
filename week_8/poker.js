/* Calculate the most winning player in multiple poker sessions according to simplified rules. The product of the
product of all games won by all players is printed. */

const pairs = (hand, comparator) => {
    let listPairs = []
    for (let i = 0; i < hand.length; i++) {
        let pair = [hand[i]]
        for (let j = i + 1; j < hand.length; j++) {
            if (comparator(hand[i], hand[j])) {
                pair.push(hand[j])
            }
        }

        if (pair.length > 1 && listPairs.length === 0 || pair.every(card => listPairs.map(otherPair => !otherPair.includes(card)).every(v => v))) {
            listPairs.push(pair)
        }
    }

    return listPairs
}


const rankToNumLookup = key => {
    const dict = {
        'Jack': 11,
        'Queen': 12,
        'King': 13,
        'Ace': 14,
    };

    if (Object.keys(dict).includes(key)) {
        return dict[key]
    } else {
        return Number(key)
    }


}


// Source: https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
function histogram(arr) {
    return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
}

const compCard = (card, otherCard) => card.Rank === otherCard.Rank && card.Suit === otherCard.Suit
const compRank = (card, otherCard) => card.Rank === otherCard.Rank


const onePair = hand => pairs(hand, compRank).filter(pair => pair.length >= 2).length >= 1
const twoPair = hand => pairs(hand, compRank).filter(pair => pair.length >= 2).length >= 2
const threeOfKind = hand => pairs(hand, compRank).filter(pair => pair.length >= 3).length >= 1
const straight = hand => {
    let sortedHand = [...hand]
    sortedHand.sort((card, otherCard) => rankToNumLookup(card.Rank) - rankToNumLookup(otherCard.Rank))

    for (let i = 0; i < sortedHand.length - 1; i++) {
        if (rankToNumLookup(sortedHand[i].Rank) !== rankToNumLookup(sortedHand[i + 1].Rank) - 1) {
            return false
        }
    }

    return true
}
const flush = hand => new Set(hand.map(card => card.Suit)).size === 1
const fullHouse = hand => {
    let listPairs = pairs(hand, compRank)
    return listPairs.some(pair => pair.length === 2) && listPairs.some(pair => pair.length === 3)
}
const fourOfKind = hand => Object.values(histogram(hand.map(card => card.Rank))).includes(4)
const straightFlush = hand => straight(hand) && flush(hand)
const royalFlush = hand => {
    return hand.filter(card => [10, 'Jack', 'Queen', 'King', 'Ace'].includes(card.Rank)).length === 5
        && new Set(hand.map(card => card.Suit)).size === 1
}

const combinationOrder = [onePair, twoPair, threeOfKind, straight, flush, fullHouse, fourOfKind, straightFlush, royalFlush]

const highestPriority = hand => combinationOrder.indexOf(combinationOrder.filter(combination => combination(hand)).pop())


let outcomes = []

function calcPlayerToNumWin(game_list) {
    const playersToWin = {}


    for (let game of game_list) {
        const playersToHighest = {}
        const players = Object.keys(game)
        for (const player of players) {
            playersToHighest[player] = highestPriority(game[player])
            outcomes.push(highestPriority(game[player]))
        }
        // Source: https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
        const winner = Object.keys(playersToHighest).reduce((a, b) => {
            return playersToHighest[a] > playersToHighest[b] ? a : b
        })

        if (!playersToWin.hasOwnProperty(winner)) {
            playersToWin[winner] = 0
        }

        if (new Set(Object.values(playersToHighest)).size === players.length) {
            playersToWin[winner] += 1
        }

    }
    return playersToWin;
}

let fs = require('fs')
let game_list = JSON.parse(fs.readFileSync('poker.json', 'utf8'))
const playersToWin = calcPlayerToNumWin(game_list)
let temp = histogram(outcomes)
console.log(temp)
console.log(Object.values(playersToWin).reduce(((previousValue, currentValue) => previousValue * currentValue), 1))
