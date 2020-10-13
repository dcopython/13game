import checkCardValue from './checkCardValue.js';
/* 
    Used to compare the value of the cards about to be played to the values of the
    last played cards in the played pile. If it's higher, return true.
    If not, return false
    @param {string[]} cardsToBePlayed - passed in array of cardnames 
    @param {string[]} lastPlayedCards - array of cardnames from lastPlayedCards state
*/
const cardComparison = (cardsToBePlayed, lastPlayedCards) => {
    // check that amount of cards to play matches the amount of cards already played
    if (cardsToBePlayed.length !== lastPlayedCards.length) {
        return 'length';
    }

    let previousValue = 0;
    let currentValue = 0;
    // calculate value of all cards last played
    for (let i = 0; i < lastPlayedCards.length; i++) {
        previousValue += checkCardValue(lastPlayedCards[i]);
        currentValue += checkCardValue(cardsToBePlayed[i]);
    }

    // compare last played card to the card about to be played to see if it's a valid move
    if (currentValue > previousValue) {
        return true;
    } else {
        return false;
    }
};

export default cardComparison;