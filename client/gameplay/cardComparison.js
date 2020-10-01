import checkCardValue from './checkCardValue.js';

// check cards for valid move
const cardComparison = (cardToBePlayed, playedCards) => {
    const prevCard = playedCards[playedCards.length - 1];

    // check value and suit of current card
    const prevCardValue = checkCardValue(prevCard);

    // check value and suit of card to be played
    const currentCardValue = checkCardValue(cardToBePlayed);

    // compare last played card to the card about to be played to see if it's a valid move
    if (currentCardValue > prevCardValue) {
        return true;
    } else {
        return false;
    }

};

export default cardComparison;