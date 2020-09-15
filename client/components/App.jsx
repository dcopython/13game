import React, { useState, useEffect } from 'react';
import PlayerHand from './PlayerHand.jsx';
import CompHands from './CompHands.jsx';
import PlayedCardsPile from './PlayedCardsPile.jsx';
import cards from '../cards.js';

const App = () => {
    // game setup state
    const [decks, setDecks] = useState([]);
    const [playedCards, setPlayedCards] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);
    const [compTwoCards, setCompTwoCards] = useState([]);
    const [compThreeCards, setCompThreeCards] = useState([]);
    const [compFourCards, setCompFourCards] = useState([]);

    // gameplay state
    const [currentPlayer, setCurrentPlayer] = useState(0);

    // const shuffleDeck = () => {
    //     const shuffledDeck = cards;

    //     for (let i = shuffledDeck.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * i);
    //         const temp = shuffledDeck[i];
    //         shuffledDeck[i] = shuffledDeck[j];
    //         shuffledDeck[j] = temp;
    //     }

    //     dealCards(shuffledDeck);
    // };

    // const dealCards = (deck) => {
    //     // deal cards to player
    //     setPlayerCards(deck.slice(0, 13));

    //     // deal cards to computer players
    //     setCompTwoCards(deck.slice(13, 26));
    //     setCompThreeCards(deck.slice(26, 39));
    //     setCompFourCards(deck.slice(39, 52));
    // };

    const changePlayerTurn = () => {
        // turns always go clockwise 1 to 4
        if (currentPlayer === 3) {
            setCurrentPlayer(0);
        } else {
            setCurrentPlayer(prevState => prevState + 1);
        }
    };

    // const startGame = () => {
    //     // look through all decks for 3 of spades
    //     decks.forEach((deck, i) => {
    //         deck.forEach((card, j) => {
    //             if (card === '3S') {
    //                 // set the player that has it as starting player
    //                 setCurrentPlayer(i);

    //                 // remove card from deck
    //                 deck.splice(j, 1);

    //                 // place deck into middle pile
    //                 setPlayedCards(['3S']);
    //             }
    //         })
    //     });

    //     // change to next player
    //     changePlayerTurn();
    // }

    // find point value of a single card
    const checkCardValue = (card) => {
        const faceValue = {
            "3": 30,
            "4": 40,
            "5": 50,
            "6": 60,
            "7": 70,
            "8": 80,
            "9": 90,
            "10": 100,
            "J": 110,
            "Q": 120,
            "K": 130,
            "A": 140,
            "2": 150,
        }

        const suitValue = {
            "S": 1,
            "C": 2,
            "D": 3,
            "H": 4,
        }
        
        // calculate face points
        let points = 0;

        if (card.length === 3) { // need to account for 10 cards
            const facePoints = faceValue[card.slice(0, 2)];
            points += facePoints;

            const suitPoints = suitValue[card.slice(2)];
            points += suitPoints;
        } else {
            const facePoints = faceValue[card.slice(0, 1)];
            points += facePoints;

            const suitPoints = suitValue[card.slice(1)];
            points += suitPoints;
        }

        return points;
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

    // check cards for valid move
    const cardComparison = (cardToBePlayed) => {
        const prevCard = playedCards[playedCards.length - 1];

        // check value and suit of current card
        const prevCardValue = checkCardValue(prevCard);

        // check value and suit of card to be played
        const currentCardValue = checkCardValue(cardToBePlayed);

        // console.log('prev: ', prevCardValue);
        // console.log('next: ', currentCardValue);

        // compare last played card to the card about to be played to see if it's a valid move
        if (currentCardValue > prevCardValue) {
            // play that card
            playSingleCard(cardToBePlayed, currentPlayer)
        } else {
            // card is not a valid play
            // display message to tell user to pick another card
            const alertDiv = document.getElementById('alert');

            alertDiv.innerText = 'Not a valid card, please pick a higher value card';

            // clear alert message after 3 seconds
            setTimeout(() => {
                alertDiv.innerText = '';
            }, 2000);
        }

    };

    const playCompHand = () => {
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

        // loop through current hand and find a card with the clos and play it
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
            displayAlert(`Player ${currentPlayer} has decided to pass.`);

            changePlayerTurn();
        } else { // otherwise, take card with lowest difference, remove it from current hand and place into played pile
            const index = currentHand.indexOf(sortedHand[0]);

            currentHand.splice(index, 1);

            setPlayedCards([...playedCards, sortedHand[0]]);

            compHandSetters[currentPlayer]([...currentHand]);

            changePlayerTurn();
        }
    };

    // handle player playing a card
    const handleCardClick = (card) => {
        // check if it's player 1's turn

        cardComparison(card);

        // move to next turn
        changePlayerTurn();
    }

    // shuffle deck and deal cards
    useEffect(() => {
        const shuffledDeck = cards;

        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = shuffledDeck[i];
            shuffledDeck[i] = shuffledDeck[j];
            shuffledDeck[j] = temp;
        }

        // deal cards to player
        setPlayerCards(shuffledDeck.slice(0, 13));

        // deal cards to computer players
        setCompTwoCards(shuffledDeck.slice(13, 26));
        setCompThreeCards(shuffledDeck.slice(26, 39));
        setCompFourCards(shuffledDeck.slice(39, 52));
        
    },[]);

    // when all decks are filled, update decks array
    useEffect(() => {
        setDecks([playerCards, compTwoCards, compThreeCards, compFourCards]);
    },[playerCards, compTwoCards, compThreeCards, compFourCards])

    // look for 3 of spades to start game
    useEffect(() => {
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
    }, [decks]);

    return (
        <div>
            <CompHands cards2={compTwoCards} cards3={compThreeCards} cards4={compFourCards} />
            <PlayerHand cards={playerCards} handleCardClick={handleCardClick} />
            <div className='messages'>
                <div className='game-status'>{`Player ${currentPlayer + 1}'s Turn`}</div>
                <div id='alert'></div>
            </div>
            {playedCards.length === 0 ? 'Loading' : <PlayedCardsPile pile={playedCards} />}
            <button onClick={playCompHand}>Computer Turn</button>
        </div>
    )
}

export default App;