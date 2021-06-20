/* Calculate the most winning player in multiple poker sessions according to simplified rules. The product of the
product of all games won by all players is printed. */

// Source: https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
const argmax = obj => Object.keys(obj).reduce((a, b) => {
    return obj[a] > obj[b] ? a : b
})


// Source: https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
function histogram(arr) {
    return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
}


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


const conditionElseHighCard = (game, condition) => {
    let hasCondition = {}
    for (const player of Object.keys(game)) {
        let hand = game[player]
        hasCondition[player] = condition(hand)
    }

    if (histogram(Object.values(hasCondition))[true] === 1) {
        return argmax(hasCondition)
    } else if (histogram(Object.values(hasCondition))[true] >= 1) {
        return highCard(game)
    } else {
        return undefined
    }
}


const compRank = (card, otherCard) => card.Rank === otherCard.Rank

const highCard = game => {
    for (let i = 4; i >= 0; i--) {
        let highestCard = {}
        for (let player of Object.keys(game)) {
            highestCard[player] = rankToNumLookup(game[player][4].Rank)
        }

        if (new Set(Object.values(highestCard)).size === Object.values(highestCard).length) {
            return argmax(highestCard)
        }
    }

    return undefined
}


const highestPairElseHighCard = (game, minPairLength) => {
    let highestPair = {}
    for (let player of Object.keys(game)) {
        let hand = game[player]
        let allPairs = pairs(hand, compRank).filter(pair => pair.length >= minPairLength)
        highestPair[player] = Math.max(...allPairs.map(pair => rankToNumLookup(pair[0].Rank)))
    }

    let playerWithMaxPair = argmax(highestPair)

    if (highestPair[playerWithMaxPair] === -Infinity) {
        return undefined
    }

    if (new Set(Object.values(highestPair)).size === Object.values(highestPair).length) {
        return playerWithMaxPair
    } else {
        return highCard(game)
    }

}

const onePair = game => highestPairElseHighCard(game, 2)
const twoPair = hand => pairs(hand, compRank).filter(pair => pair.length >= 2).length >= 2 // TODO: Ask
const threeOfKind = game => highestPairElseHighCard(game, 3)

const straightCondition = hand => hand.every((_, i) => i === hand.length - 1 || rankToNumLookup(hand[i].Rank) === rankToNumLookup(hand[i + 1].Rank) - 1)
const straight = game => conditionElseHighCard(game, straightCondition)

const flushCondition = hand => new Set(hand.map(card => card.Suit)).size === 1
const flush = game => conditionElseHighCard(game, flushCondition)

const fullHouse = game => {

    let playerToTupleRank = {}
    let playerToTripleRank = {}

    for (const player of Object.keys(game)) {
        let hand = game[player]
        let listPairs = pairs(hand, compRank)
        playerToTupleRank[player] = Math.max(...listPairs.filter(pair => pair.length === 2).map(pair => rankToNumLookup(pair[0].Rank)))
        playerToTripleRank[player] = Math.max(...listPairs.filter(pair => pair.length === 3).map(pair => rankToNumLookup(pair[0].Rank)))
    }

    let playersWithFullHouse =
        Object.keys(game).filter(player => playerToTupleRank[player] !== -Infinity && playerToTripleRank !== -Infinity)

    if (playersWithFullHouse.length === 0) {
        return undefined
    }

    if (new Set(Object.values(playerToTripleRank)).size === Object.values(playerToTripleRank).length) {
        return argmax(playerToTripleRank)
    } else {
        return argmax(playerToTupleRank)
    }
}

const fourOfKind = hand => Object.values(histogram(hand.map(card => card.Rank))).includes(4) // TODO: Ask
const straightFlush = playersToHand => conditionElseHighCard(playersToHand, hand => straightCondition(hand) && flushCondition(hand))
const royalFlush = playersToHand => conditionElseHighCard(playersToHand, hand => hand.filter(card => [10, 'Jack', 'Queen', 'King', 'Ace'].includes(card.Rank)).length === 5 && new Set(hand.map(card => card.Suit)).size === 1)


const combinationOrder = [highCard, onePair, threeOfKind, straight, flush, fullHouse, straightFlush, royalFlush]

const winnerOfGame = game => {
    let temp = combinationOrder.map(combination => combination(game))
    let winner = combinationOrder.map(combination => combination(game)).filter(combination => combination !== undefined).pop()
    return winner
}


function calcPlayerToNumWin(game_list) {
    const playersToWin = {}


    for (let game of game_list) {
        const playersToHighest = {}
        const players = Object.keys(game)

        for (const player of players) {
            game[player].sort((card, otherCard) => rankToNumLookup(card.Rank) - rankToNumLookup(otherCard.Rank))
        }

        const winner = winnerOfGame(game)

        if (!playersToWin.hasOwnProperty(winner)) {
            playersToWin[winner] = 0
        }

        playersToWin[winner] += 1

    }
    return playersToWin;
}

let fs = require('fs')
let game_list = JSON.parse(fs.readFileSync('poker.json', 'utf8'))
const playersToWin = calcPlayerToNumWin(game_list)
console.log(playersToWin.Alice * playersToWin.Bob)
