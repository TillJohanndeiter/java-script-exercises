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

function sortGame(game) {
    const players = Object.keys(game)
    const sortedGame = {}

    for (const player of players) {
        sortedGame[player] = [...game[player]]
        sortedGame[player].sort((card, otherCard) => rankToNumLookup(card.Rank) - rankToNumLookup(otherCard.Rank))
    }

    return sortedGame
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

        if (pair.length > 1 && (listPairs.length === 0 || pair.every(card => listPairs.map(otherPair => !otherPair.includes(card)).every(v => v)))) {
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


const condition = (game, condition, alternative) => {
    let hasCondition = {}
    for (const player of Object.keys(game)) {
        let hand = game[player]
        hasCondition[player] = condition(hand)
    }

    if (histogram(Object.values(hasCondition))[true] === 1) {
        return argmax(hasCondition)
    } else if (histogram(Object.values(hasCondition))[true] >= 1) {
        return alternative(game)
    } else {
        return undefined
    }
}


const compRank = (card, otherCard) => card.Rank === otherCard.Rank

const highCard = game => {
    let highestCard = {}
    for (let player of Object.keys(game)) {
        highestCard[player] = Math.max(...game[player].map(card => rankToNumLookup(card.Rank)))
    }

    const playerWithHighestCard = argmax(highestCard)

    if (histogram(Object.values(highestCard))[highestCard[playerWithHighestCard]] === 1) {
        return argmax(highestCard)
    }

    return undefined
}

const lastCard = game => {
    let highestLastCard = {}

    for (let player of Object.keys(game)) {
        highestLastCard[player] = rankToNumLookup(game[player][4].Rank)
    }

    let player = argmax(highestLastCard)

    if (histogram(Object.values(highestLastCard))[highestLastCard[player]] === 1) {
        return player
    } else {
        return undefined
    }
}

const highestPair = (game, minPairLength, alternative) => {
    let highestPair = {}
    let numPairs = {}
    for (let player of Object.keys(game)) {
        let hand = game[player]
        let allPairs = pairs(hand, compRank).filter(pair => pair.length >= minPairLength)
        highestPair[player] = Math.max(...allPairs.map(pair => rankToNumLookup(pair[0].Rank)))
        numPairs[player] = allPairs.length

    }


    highestPair = Object.fromEntries(Object.entries(highestPair)
        .filter(([player, _]) => numPairs[player] >= 1))

    if (Object.keys(highestPair).length === 0) {
        return undefined
    }


    let playerWithMaxPair = argmax(highestPair)


    if (histogram(Object.values(highestPair))[highestPair[playerWithMaxPair]] === 1) {
        return playerWithMaxPair
    } else {
        return alternative(game)
    }

}

const onePair = game => highestPair(game, 2, highCard)
const twoPair = game => {
    let highestPair = {}
    let numPairs = {}
    for (let player of Object.keys(game)) {
        let hand = game[player]
        let allPairs = pairs(hand, compRank).filter(pair => pair.length >= 2)

        if (allPairs.length >= 2) {
            highestPair[player] = allPairs[1][0].Rank
            numPairs[player] = allPairs.length
        }
    }

    highestPair = Object.fromEntries(Object.entries(highestPair)
        .filter(([player, _]) => numPairs[player] >= 2))

    if (Object.keys(highestPair).length === 0) {
        return undefined
    }

    const playerWithMaxPair = argmax(highestPair)

    if (histogram(Object.values(highestPair))[highestPair[playerWithMaxPair]] === 1) {
        return playerWithMaxPair
    } else {
        return lastCard(game)
    }

}
const threeOfKind = game => highestPair(game, 3, highCard)

const straightCondition = hand => hand.every((_, i) => i === hand.length - 1 || rankToNumLookup(hand[i].Rank) === rankToNumLookup(hand[i + 1].Rank) - 1)
const straight = game => {
    let sortedGame = sortGame(game)
    return condition(sortedGame, straightCondition, highCard)
}

const flushCondition = hand => new Set(hand.map(card => card.Suit)).size === 1
const flush = game => condition(game, flushCondition, highCard)

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
        Object.keys(game).filter(player => !(playerToTupleRank[player] === -Infinity || playerToTripleRank[player] === -Infinity))

    if (playersWithFullHouse.length === 0) {
        return undefined
    }

    const playerWithHighestTriple = argmax(playerToTripleRank)

    if (histogram(Object.values(playerToTripleRank))[playerToTripleRank[playerWithHighestTriple]] === 1) {
        return argmax(playerToTripleRank)
    } else {
        return argmax(playerToTupleRank)
    }
}

const fourOfKind = game => condition(game, hand => Object.values(histogram(Object.keys(hand))).includes(4), lastCard)
const straightFlush = game => condition(game, hand => straightCondition(hand) && flushCondition(hand), highCard)
const royalFlush = game => condition(game, hand => new Set(hand.map(card => card.Rank)) === new Set([10, 'Jack', 'Queen', 'King', 'Ace']) && new Set(hand.map(card => card.Suit)).size === 1, highCard)


const combinationOrder = [highCard, onePair, twoPair, threeOfKind, straight, flush, fullHouse, fourOfKind, straightFlush, royalFlush]

const winnerOfGame = game => {
    return combinationOrder.map(combination => combination(game)).filter(winner => winner !== undefined).pop()
}


function calcPlayerToNumWin(game_list) {
    const playersToWin = {}


    for (let game of game_list) {

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
