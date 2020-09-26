import React from 'react';
import Card from './Card.jsx';
import checkCardValue from '../gameplay/checkCardValue.js';

const CompHands = ({ 
    decks,
    setDecks,
    playedCards,
    setPlayedCards,
    currentPlayer,
    displayAlert,
    changePlayerTurn 
    }) => {
    const playCompHand = () => {
        const decksCopy = [...decks];

        // find last played card and get value of it
        const prevCard = playedCards.cards[playedCards.cards.length - 1];
        const prevCardValue = checkCardValue(prevCard);
        // let maxPrevValue = 0;
    
        // if (prevCardValue.length === 3) {
        //     maxPrevValue = (Math.round(prevCardValue / 100) * 100) + 4;
        // } else {
        //     maxPrevValue = (Math.round(prevCardValue / 10) * 10) + 4;
        // }
    
        // loop through current hand and find a card with the closest value and play it
        // get current player's hand
        const currentHand = decksCopy[currentPlayer];
        console.log('current hand: ', currentHand);
    
        let sortedHand = [];
        // for each card, find the value and push any card that can beat previous card to sorted hand
        currentHand.forEach((card) => {
            const currentCardValue = checkCardValue(card);
            
            if (currentCardValue > prevCardValue) {
                sortedHand.push(card);
            }
        });
    
        console.log('pre-sorted: ', sortedHand);
    
        // sort by smallest value difference from previous card
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
            setPlayedCards({
                lastPlayedBy: currentPlayer,
                cards: [...playedCards.cards, sortedHand[0]]
            })
            setDecks(decksCopy);
            changePlayerTurn();
        }
    };

    return (
        <div className='compHands-container'>
            <div className='hand hhand-compact compTwo-hand'>
                {decks[1].map((card, i) => (
                    <Card card={card} key={i}/>
                ))}
            </div>
            <div className='hand hhand-compact compThree-hand'>
                {decks[2].map((card, i) => (
                    <Card card={card} key={i}/>
                ))}
            </div>
            <div className='hand hhand-compact compFour-hand'>
                {decks[3].map((card, i) => (
                    <Card card={card} key={i}/>
                ))}
            </div>
            <button className='computerTurn-btn' onClick={playCompHand}>Computer Turn</button>
        </div>
    )
};

export default CompHands;