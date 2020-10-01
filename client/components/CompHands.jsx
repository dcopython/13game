import React, { useEffect } from 'react';
import Card from './Card.jsx';
import checkCardValue from '../gameplay/checkCardValue.js';

const CompHands = ({ 
    decks,
    setDecks,
    playedCards,
    setPlayedCards,
    currentPlayer,
    displayAlert,
    changePlayerTurn,
    passTurn,
    openPlay,
    setOpenPlay
    }) => {
    // plays the lowest card in the computer's hand
    const playLowestCard = (deck, card) => {
        const hand = deck[currentPlayer];
        const index = hand.indexOf(card);
        hand.splice(index, 1);
        displayAlert('play', currentPlayer, card);
        setPlayedCards({
            lastPlayedBy: currentPlayer,
            cards: [...playedCards.cards, card]
        })
        setDecks(deck);
    }

    // handles computer's turn during open play
    const compOpenPlay = (deck) => {
        const hand = deck[currentPlayer];
        // const sortedHand = hand.sort((a, b) => {
        //     return checkCardValue(a) - checkCardValue(b);
        // });

        playLowestCard(deck, hand[0]);
    };

    // controls computer's play
    const playCompHand = () => {
        const decksCopy = [...decks];

        // play any card when it's open play during computer's turn
        if (openPlay === true) {
            displayAlert('compOpen', currentPlayer);
            compOpenPlay(decksCopy);
            setOpenPlay(false);
            changePlayerTurn();
        }

        // find last played card and get value of it
        const prevCard = playedCards.cards[playedCards.cards.length - 1];
        const prevCardValue = checkCardValue(prevCard);
    
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
        // sortedHand = sortedHand.sort((a, b) => {
        //     return checkCardValue(a) - checkCardValue(b);
        // });
    
        // console.log('post-sorted: ', sortedHand);
    
        // computer will pass if sortedHand is empty
        if (sortedHand.length === 0) {
            displayAlert('pass', currentPlayer);
            const count = passTurn();
            
            // only change player turn if there hasn't been 3 passes already
            if (count < 3) {
                changePlayerTurn();
            }
        } else { // otherwise, take card with lowest difference, remove it from current hand and place into played pile
            const index = currentHand.indexOf(sortedHand[0]);
            currentHand.splice(index, 1);
            displayAlert('play', currentPlayer, sortedHand[0]);
            setPlayedCards({
                lastPlayedBy: currentPlayer,
                cards: [...playedCards.cards, sortedHand[0]]
            })
            setDecks(decksCopy);
            changePlayerTurn();
        }
    };

    useEffect(() => {
        // skip computer turn if their hand is empty
        if (currentPlayer > 0 && decks[currentPlayer].length === 0) {
            changePlayerTurn();
        } else if (currentPlayer > 0) {
            setTimeout(() => {
                playCompHand();  
            }, 2000);
        } 
    },[currentPlayer])

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