
/* Consensus sequence (most common character at given index) of the words in WORDS. */

let WORDS = ['BYCKSTABFNIALAT', 'BUCHSTRBENSFLPT', 'BUCNSIHBENSALAT', 'BVIXZIREFNZALAY', 'BUGH-IRREMSRLAI',
    'BVIHSYABENZALRY', 'RYCHSTHEENSAIAT', 'BUIHZYABF-SACAI', 'RYGKS-ABFH-ALA-', 'BVGHSTPPENSR-AT']

len = WORDS[0].length

function mostCommon(index) {
    const histogram = {};
    let max = 0;
    let maxCount = 1;
    for (const str of WORDS) {
        const c = str.charAt(index);
        if (histogram[c] == null) {
            histogram[c] = 1
        } else {
            histogram[c]++;
        }

        if (histogram[c] > maxCount) {
            max = c
            maxCount = histogram[c]
        }
    }

    return max
}

let solution = ""
for (let i = 0; i < len; i++) {
    solution += mostCommon(i)
}

console.log(solution)