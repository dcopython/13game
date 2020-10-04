/* 
    Used to check when pairs, triples, quads are played, they are
    actually matching numbers/faces or they are sequential for a straight 
    @param {string[]} cards - a list of card names
*/
const multiplePatternCheck = (cards) => {
    const sequence = '345678910JQKA2';

    const values = cards.map((card) => {
        if (card.length === 2) {
            return card.slice(0,1);
        } else {
            return card.slice(0,2);
        }
    });

    if (values.length === 1) {
        return 'single';
    } else if (values.length < 3) { // 2 cards, check if it's a pair
        return values.every(val => val === values[0]) ? 'pair' : false;
    } else if (values.length === 3) { // 3 cards, check if it's a triple or straight
        if (values.every(val => val === values[0])) {
            return 'triple';
        } else {
            return sequence.indexOf(values.join('')) !== -1 ? 'straight' : false
        }
    } else { // more than 4 cards, check if it's quad or straight
        if (values.every(val => val === values[0])) {
            return 'quad';
        } else {
            return sequence.indexOf(values.join('')) !== -1 ? 'straight' : false;
        }
    }
}

export default multiplePatternCheck;