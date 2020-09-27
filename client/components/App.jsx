import React, { useState, useEffect } from 'react';
import PlayerHand from './PlayerHand.jsx';
import CompHands from './CompHands.jsx';
import PlayedCardsPile from './PlayedCardsPile.jsx';
import UserProfile from './UserProfile.jsx';
import cards from '../cards.js';
import cardComparison from '../gameplay/cardComparison.js';
import checkCardValue from '../gameplay/checkCardValue.js';

const App = () => {
    // game setup state
    const [isDealing, setIsDealing] = useState(true);
    const [decks, setDecks] = useState([]);
    const [playedCards, setPlayedCards] = useState({
        lastPlayedBy: null,
        cards: []
    });
    
    // gameplay state
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [passedPlayers, setPassedPlayers] = useState(new Array(4).fill('false'));
    const [openPlay, setOpenPlay] = useState(false);

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

    const changePlayerTurn = (player) => {
        // if initializing current player, assign directly, otherwise continue with rotation
        if (player) {
            if (player === 3) {
                setCurrentPlayer(0);
            } else {
                setCurrentPlayer(player + 1);
            }
        } else {
            if (currentPlayer === 3) {
                setCurrentPlayer(0);
            } else {
                setCurrentPlayer(currentPlayer + 1);
            }
        }
    };

    const passTurn = () => {
        const passes = [...passedPlayers];

        passes[currentPlayer] = true;

        const countPasses = passes.reduce((total, bool) => {
            if (bool === true) {
                total += 1;
            }

            return total;
        }, 0);

        // if the three other players pass, set currentPlayer to whoever played the last card
        // then change openPlay to true to signal that any card can be played
        // and reset passes state
        if (countPasses === 3) {
            setCurrentPlayer(playedCards.lastPlayedBy);
            setOpenPlay(true);
            setPassedPlayers(new Array(4).fill('false'));
        } else {
            // update passed array with latest passed player
            setPassedPlayers(passes);
        }
    }

    const startGame = () => {
        // shuffle cards and deal into four hands
        let decks = shuffleDeck();
        decks = dealCards(decks);

        // look through all decks for 3 of spades
        decks.forEach((deck, i) => {
            deck.forEach((card, j) => {
                if (card === '3S') {
                    // remove card from deck
                    deck.splice(j, 1);

                    // place deck into played pile
                    setPlayedCards({
                        lastPlayedBy: i,
                        cards: ['3S']
                    });

                    // pass on deck number to function to assign next player
                    changePlayerTurn(i);
                }
            })
        });

        return decks;
    }

    const displayAlert = (msgType) => {
        const alertDiv = document.getElementById('alert');
        const msgs = {
            'pass': `Player ${currentPlayer + 1} has decided to pass`,
            'open': 'All other players have passed, play any card combination'
        };

        alertDiv.innerText = `${msgs[msgType]}`;

        // clear alert message after 3 seconds
        setTimeout(() => {
            alertDiv.innerText = '';
        }, 2000);
    };

    // takes in card to be played and current player
    // handles removing card from hand and moving to played pile
    const playSingleCard = (card) => {
        const hands = [...decks];

        // find position of current card in hand
        const index = hands[currentPlayer].indexOf(card);

        // splice current card from currentHand
        hands[currentPlayer].splice(index, 1);

        // update currentPlayer hand
        setPlayedCards({
            lastPlayedBy: currentPlayer,
            cards: [...playedCards.cards, card]
        })

        return hands;
    };

    useEffect(() => {
        const deck = startGame(deck);

        setDecks(deck);
        setIsDealing(false);
    },[]);


    return (
        <div>
            { isDealing === true ? 'Dealing cards...' : 
                <CompHands 
                    decks={decks}
                    setDecks={setDecks}
                    playedCards={playedCards}
                    setPlayedCards={setPlayedCards}
                    currentPlayer={currentPlayer}
                    displayAlert={displayAlert}
                    changePlayerTurn={changePlayerTurn}
                />
            }
            { isDealing === true ? 'Dealing cards...' : 
                <PlayerHand 
                    cards={decks[0]} 
                    playedCards={playedCards}
                    playSingleCard={playSingleCard}
                    setDecks={setDecks}
                    changePlayerTurn={changePlayerTurn}
                    currentPlayer={currentPlayer}
                    openPlay={openPlay}
                    displayAlert={displayAlert}
                />
            }
            <div className='messages'>
                <div className='game-status'>{`Player ${currentPlayer + 1}'s Turn`}</div>
                <div id='alert'></div>
            </div>
            <div className='playedPile'>
                {playedCards.cards.length === 0 ? 'Loading' : <PlayedCardsPile pile={playedCards.cards} />}
            </div>
        </div>
    )
}

export default App;