import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import cardComparison from '../gameplay/cardComparison.js';

const PlayerHand = ({ 
    decks,
    playedCards,
    setPlayedCards,
    setDecks,
    changePlayerTurn,
    currentPlayer,
    displayAlert,
    passTurn,
    openPlay,
    setOpenPlay,
    }) => {
    const [selectedCards, setSelectedCards] = useState([]);

    // takes in card to be played and current player
    // handles removing card from hand and moving to played pile
    const playSingleCard = (card) => {
        const hands = [...decks];

        // find position of current card in hand
        const index = hands[currentPlayer].indexOf(card);

        // splice current card from currentHand
        hands[currentPlayer].splice(index, 1);

        // display what card was played
        displayAlert('play', currentPlayer, card);

        // update currentPlayer hand
        setPlayedCards({
            lastPlayedBy: currentPlayer,
            cards: [...playedCards.cards, card]
        })

        return hands;
    };

    // handle player playing a card
    const handleCardClick = (card) => {
        const stateCopy = [...selectedCards];
        const previouslySelectedCard = stateCopy.indexOf(card);
        
        if (previouslySelectedCard === -1) {
            // selecting card
            stateCopy.push(card);
        } else {
            // unselecting card
            stateCopy.splice(previouslySelectedCard, 1);
        }

        setSelectedCards(stateCopy);
    };

    const handlePlayButton = () => {
        let validPlay = false;

        const updateHandAndTurn = () => {
            let hands = playSingleCard(card);
            setDecks(hands);

            if (openPlay === true) {
                setOpenPlay(false);
            }

            changePlayerTurn();
        };

        // only register clicks if it's player 0's turn
        // allow player 0 to play any card if it's their turn and it's an open play
        if (currentPlayer === 0 && openPlay === true) {
            updateHandAndTurn();
        }
        else if (currentPlayer === 0) {
            // if not open play, check card values first
            validPlay = cardComparison(card, playedCards.cards);

            if (validPlay === true) {
                updateHandAndTurn();
            } else {
                displayAlert('invalid');
            }
        }
    };

    const handlePlayerPass = () => {
        if (currentPlayer === 0) {
            displayAlert('pass', currentPlayer);
            const count = passTurn();
            
            // only change player turn if there hasn't been 3 passes already
            if (count < 3) {
                changePlayerTurn();
            }
        }
    };

    useEffect(() => {
        if (openPlay === true && currentPlayer === 0) {
            displayAlert('open', currentPlayer);
        }
    }, [openPlay, currentPlayer]);

    useEffect(() => {
        // player 1's turn if their hand is empty
        if (decks[0].length === 0 && currentPlayer === 0) {
            changePlayerTurn();
        }
    }, [currentPlayer]);

    return (
        <div className='playerHand-container'>
            <h5>Your Hand:</h5>
            <div className='hand hhand-compact'>
                {decks[0].map((card, i) => (
                    <Card card={card} key={i} showFace={true} handleCardClick={handleCardClick} />
                ))}
            </div>
            <button type='button' onClick={handlePlayButton}>Play</button>
            <button type='button' onClick={handlePlayerPass}>Pass</button>
        </div>
    );
}

export default PlayerHand;