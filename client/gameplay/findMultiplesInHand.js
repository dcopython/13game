/*
    This function takes in an array of cards and sorts them into single, pair,
    triples, or quads depending on their count.
    Returns an object with the cards grouped into their combos in arrays
    @param {string[]} cards
    @param {string} pattern
    @param {string[]} lastPlayedCards
*/
const findMultiplesInHand = (cards, pattern, lastPlayedCards) => {
    if (pattern !== 'straight') {
        const combos = {
            'single': [],
            'pair': [],
            'triple': [],
            'quad': []
        };
    
        // counts the number of similar cards and groups them by value
        const count = cards.reduce((acc, card) => {
            let value = card.length === 2 ? card.slice(0, 1) : card.slice(0, 2);
            acc[value] === undefined ? acc[value] = [card] : acc[value].push(card);
            return acc;
        }, {});
    
        // groups cards into combos depending on the count
        for (let key in count) {
            const length = count[key].length;
    
            if (length === 1) {
                combos['single'] = combos['single'].concat(count[key]);
            } else if (length === 2) {
                combos['pair'].push(count[key]);
            } else if (length === 3) {
                combos['triple'].push(count[key]);
            } else {
                combos['quad'].push(count[key]);
            }
        }
    
        return combos[pattern];
    } else {
        // get the length of the current straight

        // get the value of the first card in that straight

        // loop through hand starting initial value looking for sequential cards
    }
};

export default findMultiplesInHand;