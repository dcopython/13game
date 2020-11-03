import React, { useState, useEffect } from 'react';
import PlayerHand from './PlayerHand.jsx';
import CompHands from './CompHands.jsx';
import PlayedCardsPile from './PlayedCardsPile.jsx';
import PlacingBoard from './PlacingBoard.jsx';
import MessageBoard from './MessageBoard.jsx';
import cards from '../cards.js';
import checkCardValue from '../gameplay/checkCardValue.js';

const App = () => {
    // game setup state
    const [isDealing, setIsDealing] = useState(true);
    const [decks, setDecks] = useState([]);
    const [playedCards, setPlayedCards] = useState({
        lastPlayedBy: null,
        lastPlayedCards: [],
        lastPattern: null,
        cardPile: [],
    });

    // message board state
    const [alertMsg, setAlertMsg] = useState(null);
    
    // gameplay state
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [passedPlayers, setPassedPlayers] = useState(new Array(4).fill('false'));
    const [openPlay, setOpenPlay] = useState(false);
    const [placing, setPlacing] = useState([]);
    const [endGame, setEndGame] = useState(false);

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
            let hand = deck.slice(i, i += 13);
            // sort them in ascending order
            hand = hand.sort((a, b) => {
                return checkCardValue(a) - checkCardValue(b);
            });
            hands.push(hand);
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
            if (currentPlayer !== null) {
                if (currentPlayer === 3) {
                    setCurrentPlayer(0);
                } else {
                    setCurrentPlayer(currentPlayer + 1);
                }
            }  
        }
    };

    const passTurn = () => {
        const passes = [...passedPlayers];
        passes[currentPlayer] = true;

        // calculate # of players left in game and reduce amount of passes
        // needed for open play as players drop out
        const passesNeededForOpenPlay = (4 - (placing.length + 1));

        const countPasses = passes.reduce((total, bool) => {
            if (bool === true) {
                total += 1;
            }

            return total;
        }, 0);

        // if the three other players pass, set currentPlayer to whoever played the last card
        // then change openPlay to true to signal that any card can be played
        // and reset passes state
        if (countPasses === passesNeededForOpenPlay) {
            displayAlert('pass', currentPlayer);
            setOpenPlay(true);

            // if last player that played card is out of game, set next player to whoever passed first
            if (placing.includes(playedCards.lastPlayedBy)) {
                setCurrentPlayer(passedPlayers.indexOf(true));
            } else {
                setCurrentPlayer(playedCards.lastPlayedBy);
            }

            setPassedPlayers(new Array(4).fill(false));
            playedCards.lastPlayedBy === 0 ? 
                displayAlert('open', playedCards.lastPlayedBy) : displayAlert('compOpen', playedCards.lastPlayedBy);
        } else {
            // update passed array with latest passed player
            setPassedPlayers(passes);
        }

        return countPasses;
    };

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
                        lastPlayedCards: ['3S'],
                        lastPattern: 'single',
                        cardPile: ['3S']
                    });

                    // pass on deck number to function to assign next player
                    setCurrentPlayer(i);
                }
            })
        });

        return decks;
    };

    const checkPlacing = (hand) => {
        if (hand.length === 0) {
            let placeCopy = [...placing];
            placeCopy.push(currentPlayer);
            setPlacing(placeCopy);
        }
    };

    const displayAlert = (msgType, currentPlayer = null, card = null) => {
        if (alertMsg === null) {
            setAlertMsg([[msgType, currentPlayer, card]]);
        } else {
            setAlertMsg([...alertMsg, [msgType, currentPlayer, card]]);
        }
    };

    // function updatePlayedCards(player, cards, pattern) {
    //     setPlayedCards({
    //         lastPlayedBy: player,
    //         lastPlayedCards: cards,
    //         lastPattern: pattern,
    //         cardPile: [...playedCards.cardPile, ...cards]
    //     });
    // };

    // used to start the game
    useEffect(() => {
        const deck = startGame(deck);
        setDecks(deck);
        setIsDealing(false);
    },[]);

    // used to check for empty hands each time a card is played
    useEffect(() => {
        decks.forEach((deck, i) => {
            if (deck.length === 0) {
                // check to make sure it's not adding previously checked winners
                if (!placing.includes(i)) {
                    const places = [...placing];
                    places.push(i);
                    setPlacing(places);
                    // let next player over play any card
                    setOpenPlay(true);
                    changePlayerTurn();
                }
            }
        })
    }, [playedCards])

    // used to stop game if there's three finishes
    useEffect(() => {
        if (placing.length === 3) {
            const stopGame = () => {
                // find the last player that still has cards
                decks.forEach((deck, i) => {
                    if (deck.length > 0) {
                        // add them placing array
                        const places = [...placing];
                        places.push(i);
                        setPlacing(places);
                    }
                });
        
                // set endgame to true to allow placing board to show
                setEndGame(true);
            };

            // if three people have finished, show placing board
            stopGame();
        }
    }, [placing]);

    return (
        <div>
            <div className={endGame === false ? 'main' : 'main hide'}>
                { isDealing === true ? 'Dealing cards...' : 
                    <CompHands 
                        decks={decks}
                        setDecks={setDecks}
                        playedCards={playedCards}
                        setPlayedCards={setPlayedCards}
                        currentPlayer={currentPlayer}
                        displayAlert={displayAlert}
                        changePlayerTurn={changePlayerTurn}
                        passTurn={passTurn}
                        openPlay={openPlay}
                        setOpenPlay={setOpenPlay}
                        endGame={endGame}
                        setCurrentPlayer={setCurrentPlayer}
                    />
                }
                { isDealing === true ? 'Dealing cards...' : 
                    <PlayerHand 
                        decks={decks} 
                        playedCards={playedCards}
                        setPlayedCards={setPlayedCards}
                        setDecks={setDecks}
                        changePlayerTurn={changePlayerTurn}
                        currentPlayer={currentPlayer}
                        openPlay={openPlay}
                        displayAlert={displayAlert}
                        passTurn={passTurn}
                        openPlay={openPlay}
                        setOpenPlay={setOpenPlay}
                        endGame={endGame}
                        setCurrentPlayer={setCurrentPlayer}
                    />
                }
                {playedCards.lastPlayedCards.length === 0 ? 'Loading' : <PlayedCardsPile pile={playedCards.lastPlayedCards} />}
            </div>
            <div className='boards'>
                <MessageBoard 
                    currentPlayer={currentPlayer} 
                    alertMsg={alertMsg} 
                    setAlertMsg={setAlertMsg} 
                />
                <PlacingBoard endGame={endGame} placing={placing} />
            </div>
        </div>
    )
}

export default App;