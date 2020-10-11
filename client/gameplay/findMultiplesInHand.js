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

        if (pattern === 'all') {
            return combos;
        } else {
            return combos[pattern];
        }
    } else {
        let result = [];

        // counts the number of similar cards and groups them by value
        const count = cards.reduce((acc, card) => {
            let value = card.length === 2 ? card.slice(0, 1) : card.slice(0, 2);
            acc[value] === undefined ? acc[value] = [card] : acc[value].push(card);
            return acc;
        }, {});

        // get the length of the current straight
        const length = lastPlayedCards.length;

        // figure out what card the straight starts with
        const opponentCard = lastPlayedCards[0];
        const opponentCardFace = opponentCard.length === 2 ? opponentCard.slice(0, 1) : opponentCard.slice(0, 2);
        
        // loop through hand starting initial value looking for sequential cards
        // index will tell us where in the sequence to start checking
        const sequence = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let startingIndex = sequence.indexOf(opponentCardFace) + 1;
        let index = startingIndex;

        while (result.length !== length) {
            // if startingIndex reaches the end of array, no straights exist, break out of loop
            if (startingIndex === 11) {
                return false;
            } else {
                // check if value at index in sequence array exists in count object
                // if it does, push the last card in the array at that key into straight array
                if (count[sequence[index]] !== undefined) {
                    const current = count[sequence[index]];
                    result.push(current[current.length - 1]);
                    index += 1;
                } else {
                    // if we don't find a number that's in sequential order, reset the whole result array
                    // and start finding a new straight at new index
                    result = [];
                    startingIndex += 1;
                    index = startingIndex;
                }
            }
        }

        return result;
    }
};

export default findMultiplesInHand;