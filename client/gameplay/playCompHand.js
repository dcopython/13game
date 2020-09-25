export default playCompHand = () => {
    const compHandList = {
        1: compTwoCards,
        2: compThreeCards,
        3: compFourCards,
    };

    const compHandSetters = {
        1: setCompTwoCards,
        2: setCompThreeCards,
        3: setCompFourCards
    };

    // get value of previous card
    const prevCard = playedCards[playedCards.length - 1];

    // check value and suit of current card
    const prevCardValue = checkCardValue(prevCard);

    let maxPrevValue = 0;
    if (prevCardValue.length === 3) {
        maxPrevValue = (Math.round(prevCardValue / 100) * 100) + 4;
    } else {
        maxPrevValue = (Math.round(prevCardValue / 10) * 10) + 4;
    }

    // loop through current hand and find a card with the closest value and play it
    // get current player's hand
    const currentHand = compHandList[currentPlayer];
    console.log('current hand: ', currentHand);

    let sortedHand = [];

    // for each card, find the value
    currentHand.forEach((card) => {
        const currentCardValue = checkCardValue(card);

        // remove any values that wouldn't beat previous card and add to new array
        if (currentCardValue > maxPrevValue) {
            sortedHand.push(card);
        }
    });

    console.log('pre-sorted: ', sortedHand);

    // sort by smallest difference from previous card
    sortedHand = sortedHand.sort((a, b) => {
        return checkCardValue(a) - checkCardValue(b);
    });

    console.log('post-sorted: ', sortedHand);

    // computer will pass if sortedHand is empty
    if (sortedHand.length === 0) {
        displayAlert(`Player ${currentPlayer + 1} has decided to pass.`);

        changePlayerTurn();
    } else { // otherwise, take card with lowest difference, remove it from current hand and place into played pile
        const index = currentHand.indexOf(sortedHand[0]);

        currentHand.splice(index, 1);

        setPlayedCards([...playedCards, sortedHand[0]]);

        compHandSetters[currentPlayer]([...currentHand]);

        changePlayerTurn();
    }
};