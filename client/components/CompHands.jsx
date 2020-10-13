import React, { useEffect } from 'react';
import Card from './Card.jsx';
import checkCardValue from '../gameplay/checkCardValue.js';
import findMultiples from '../gameplay/findMultiplesInHand.js';

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
    const playCards = (deck, player, cards, pattern) => {
        const hand = deck[player];

        if (!Array.isArray(cards)) {
            cards = [cards];
        }

        for (let i = 0; i < cards.length; i++) {
            const index = hand.indexOf(cards[i]);    
            hand.splice(index, 1);
        };

        console.log('hand: ', hand);

        if (pattern === 'single') {
            setPlayedCards({
                lastPlayedBy: player,
                lastPlayedCards: cards,
                lastPattern: pattern,
                cardPile: [...playedCards.cardPile, ...cards]
            });
        } else {
            setPlayedCards({
                lastPlayedBy: player,
                lastPlayedCards: cards,
                lastPattern: pattern,
                cardPile: [...playedCards.cardPile, ...cards]
            });
        }
        
        setDecks(deck);
        displayAlert('play', player, cards);
    }

    // handles computer's turn during open play
    const compOpenPlay = (deck, player) => {
        const hand = deck[player];
        const results = findMultiples(hand, 'all');
        
        if (results['quad'].length > 0) {
            playCards(deck, player, results['quad'][0], 'quad');
        } else if (results['triple'].length > 0) {
            playCards(deck, player, results['triple'][0], 'triple');
        } else if (results['pair'].length > 0) {
            playCards(deck, player, results['pair'][0], 'pair');
        } else {
            playCards(deck, player, results['single'][0], 'single');
        }
    };

    // controls computer's play
    const playCompHand = () => {
        const decksCopy = [...decks];

        // play any card when it's open play during computer's turn
        if (openPlay === true) {
            displayAlert('compOpen', currentPlayer);
            compOpenPlay(decksCopy, currentPlayer);
            setOpenPlay(false);
            changePlayerTurn();
        } else {
            // get the last pattern that was played
            const pattern = playedCards.lastPattern || 'single';

            // check if computer hand has cards that match the current pattern
            const result = findMultiples(decksCopy[currentPlayer], pattern, playedCards.lastPlayedCards);

            console.log('result: ', result);
            
            if (result === false) {
                displayAlert('pass', currentPlayer);
                const count = passTurn();
                if (count < 3) {
                    changePlayerTurn();
                }
            } else {
                const sortedResult = result.sort((a, b) => {
                    if (pattern !== 'single') {
                        let totalA = 0;
                        let totalB = 0;
                        console.log('sorting: ', a, b);
    
                        for (let i = 0; i < a.length; i++) {
                            totalA += checkCardValue(a[i]);
                            totalB += checkCardValue(b[i]);
                        }
    
                        return totalA - totalB;
                    } else {
                        return checkCardValue(a) - checkCardValue(b);
                    }
                });
    
                console.log({
                    pattern,
                    sortedResult
                });
            
                // get value of last played cards
                const valueToBeat = playedCards.lastPlayedCards.reduce((total, card) => {
                    total += checkCardValue(card);
                    return total;
                }, 0);
    
                // look through result array to see if there's any combos that beat old value
                const currentValue = sortedResult.reduce((highest, cards, i) => {
                    let total = 0;
    
                    if (highest[0] > valueToBeat) {
                        return highest;
                    } else {
                        if (pattern === 'single') {
                            total += checkCardValue(cards);
                        } else {
                            cards.forEach((card) => {
                                total += checkCardValue(card);
                            });
                        }
        
                        if (total > valueToBeat) {
                            highest[0] = total;
                            highest[1] = i;
                        }
        
                        return highest;
                    }
                }, [0, 0])
    
                console.log({
                    valueToBeat,
                    currentValue
                });
    
                // if current val is higher than value to beat 
                if (currentValue[0] > valueToBeat) {
                    const index = currentValue[1];
                    const cardsToBePlayed = sortedResult[index];
                    playCards(decksCopy, currentPlayer, cardsToBePlayed, pattern);
                    changePlayerTurn();
    
                } else {
                    displayAlert('pass', currentPlayer);
                    const count = passTurn();
                    if (count < 3) {
                        changePlayerTurn();
                    }
                }
            }
        }
    };

    useEffect(() => {
        // skip computer turn if their hand is empty
        if (currentPlayer > 0 && decks[currentPlayer].length === 0) {
            changePlayerTurn();
        } 
        // else if (currentPlayer > 0) {
        //     setTimeout(() => {
        //         playCompHand();  
        //     }, 2000);
        // } 
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