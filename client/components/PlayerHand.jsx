import React, { useEffect } from 'react';
import Card from './Card.jsx';
import cardComparison from '../gameplay/cardComparison.js';

const PlayerHand = ({ 
    cards,
    playedCards,
    playSingleCard,
    setDecks,
    changePlayerTurn,
    currentPlayer,
    displayAlert,
    passTurn,
    openPlay,
    setOpenPlay
    }) => {
    // handle player playing a card
    const handleCardClick = (card) => {
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
            }
        }
    };

    const handlePlayerPass = () => {
        const count = passTurn();
        displayAlert('pass');
        
        // only change player turn if there hasn't been 3 passes already
        if (count < 3) {
            changePlayerTurn();
        }
    };

    useEffect(() => {
        if (openPlay === true && currentPlayer === 0) {
            displayAlert('open');
        }
    },[openPlay])

    return (
        <div className='playerHand-container'>
            <h5>Your Hand:</h5>
            <div className='hand hhand-compact active-hand'>
                {cards.map((card, i) => (
                    <Card card={card} key={i} showFace={true} handleCardClick={handleCardClick} />
                ))}
            </div>
            <button type='button' onClick={handlePlayerPass}>Pass</button>
        </div>
    )
}

export default PlayerHand;