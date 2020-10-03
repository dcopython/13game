import checkCardValue from './checkCardValue.js';

// check cards for valid move
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
    if (currentCardValue > prevCardValue) {
        return true;
    } else {
        return false;
    }
};

export default cardComparison;