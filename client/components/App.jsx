import React, { useState, useEffect } from 'react';
import PlayerHand from './PlayerHand.jsx';
import CompHands from './CompHands.jsx';
import PlayedCardsPile from './PlayedCardsPile.jsx';
import UserProfile from './UserProfile.jsx';
import cards from '../cards.js';
import cardComparison from '../gameplay/cardComparison.js';
import checkCardValue from '../gameplay/checkCardValue.js';
import playCompHand from '../gameplay/playCompHand.js';

const App = () => {
    // game setup state
    const [isDealing, setIsDealing] = useState(true);
    const [decks, setDecks] = useState([]);
    const [playedCards, setPlayedCards] = useState([]);

    // gameplay state
    const [currentPlayer, setCurrentPlayer] = useState(null);

    const shuffleDeck = () => {
        const shuffledDeck = cards;

        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = shuffledDeck[i];
            shuffledDeck[i] = shuffledDeck[j];
            shuffledDeck[j] = temp;
        }

        return shuffledDeck;
    };

    const dealCards = (deck) => {
        const hands = [];
        let i = 0;
        let n = deck.length;

        while (i < n) {
            hands.push(deck.slice(i, i += 13));
        }

        return hands;
    };

    const changePlayerTurn = () => {
        // turns always go clockwise 1 to 4
        if (currentPlayer === 3) {
            setCurrentPlayer(0);
        } else {
            setCurrentPlayer(currentPlayer + 1);
        }
        // setUpdatePlayerTurn(true);
    };

    const startGame = () => {
        // look through all decks for 3 of spades
        decks.forEach((deck, i) => {
            deck.forEach((card, j) => {
                if (card === '3S') {
                    // set the player that has it as starting player
                    setCurrentPlayer(i);

                    // remove card from deck
                    deck.splice(j, 1);

                    // place deck into middle pile
                    setPlayedCards(['3S']);
                }
            })
        });

        // change to next player
        changePlayerTurn();
    }

    const displayAlert = (msg) => {
        const alertDiv = document.getElementById('alert');

        alertDiv.innerText = `${msg}`;

        // clear alert message after 3 seconds
        setTimeout(() => {
            alertDiv.innerText = '';
        }, 2000);
    };

    // takes in card to be played and current player
    // handles removing card from hand and moving to played pile
    const playSingleCard = (currentCard, currentPlayer) => {
        // find position of current card in hand
        const index = playerCards.indexOf(currentCard);

        // splice current card from currentHand
        playerCards.splice(index, 1);

        // update currentPlayer hand
        setPlayedCards([...playedCards, currentCard]);

        // add current card to playedCards array
        setPlayerCards([...playerCards]);
    };

    // handle player playing a card
    const handleCardClick = (card) => {
        let validPlay = false;

        // check if it's player 1's turn
        if (currentPlayer === 0) {
           validPlay = cardComparison(card);

           if (validPlay === true) {
               changePlayerTurn();
           }
        }
    }

    useEffect(() => {
        // shuffle deck and split into 4 hands
        let deck = shuffleDeck();
        deck = dealCards(deck);

        setDecks(deck);
        setIsDealing(false);
    },[]);


    return (
        <div>
            {/* <CompHands /> */}
            { isDealing === true ? 'Dealing cards...' : <PlayerHand cards={decks[0]} handleCardClick={handleCardClick} />}
            <div className='messages'>
                <div className='game-status'>{`Player ${currentPlayer + 1}'s Turn`}</div>
                <div id='alert'></div>
            </div>
            <div className='playedPile'>
                {playedCards.length === 0 ? 'Loading' : <PlayedCardsPile pile={playedCards} />}
            </div>
            <button className='computerTurn-btn' onClick={playCompHand}>Computer Turn</button>
        </div>
    )
}

export default App;