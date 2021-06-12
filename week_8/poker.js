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

        if (pair.length > 1) {
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
    dict[key] = key
    return dict[key]
}


// Source: https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
const histogram = arr => arr.reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1), {})

const compCard = (card, otherCard) => card.Rank === otherCard.Rank && card.Suit === otherCard.Suit

const onePair = hand => pairs(hand, (card, otherCard) => card.Rank === otherCard.Rank).filter(pair => pair.length === 2).length === 1
const twoPair = hand => pairs(hand, (card, otherCard) => card.Rank === otherCard.Rank).filter(pair => pair.length === 2).length === 2
const threeOfKind = hand => hand.filter(card => hand.filter(otherCard => card.Rank === otherCard.Rank && !compCard(card, otherCard)).length === 1).length === 6
const straight = hand => hand.every((_, i) => i === hand.length || rankToNumLookup(hand[i]) === rankToNumLookup(hand[i + 1]) - 1)
const flush = hand => new Set(hand.map(card => card.Suit)).size === 1
const fullHouse = hand => hand.filter(card => hand.filter(otherCard => card.Rank === otherCard.Rank && !compCard(card, otherCard)).length === 2).length === 3
const fourOfKind = hand => Object.values(histogram(hand)).includes(4)
const straightFlush = hand => straight(hand) && flush(hand)
const royalFlush = hand => hand.filter(card => [10, 'Jack', 'Queen', 'King', 'Ace'].includes(card.Rank)) && flush(hand)

const combinationOrder = [onePair, twoPair, threeOfKind, straight, flush, fullHouse, fourOfKind, straightFlush, royalFlush]

const highestPriority = hand => combinationOrder.indexOf(combinationOrder.filter(combination => combination(hand)).pop())


function calcPlayerToNumWin(game_list) {
    const playersToWin = {}


    for (let game of game_list) {
        const playersToHighest = {}
        const players = Object.keys(game)
        for (const player of players) {
            playersToHighest[player] = highestPriority(game[player])
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
console.log(Object.values(playersToWin).reduce(((previousValue, currentValue) => previousValue * currentValue), 1))