import checkCardValue from './checkCardValue.js';

// check cards for valid move
const cardComparison = (cardToBePlayed, playedCards) => {
    const prevCard = playedCards[playedCards.length - 1];

    // check value and suit of current card
    const prevCardValue = checkCardValue(prevCard);

    // check value and suit of card to be played
    const currentCardValue = checkCardValue(cardToBePlayed);

    // console.log('prev: ', prevCardValue);
    // console.log('next: ', currentCardValue);

    // compare last played card to the card about to be played to see if it's a valid move
    if (currentCardValue > prevCardValue) {
        return true;
    } else {
        // card is not a valid play
        // display message to tell user to pick another card
        const alertDiv = document.getElementById('alert');

        alertDiv.innerText = 'Not a valid card, please pick a higher value card';

        // clear alert message after 3 seconds
        setTimeout(() => {
            alertDiv.innerText = '';
        }, 2000);

        return false;
    }

};

export default cardComparison;