import React, { useState, useEffect } from 'react';

const Card = ({ card, handleCardClick, showFace, resetHand }) => {
    const [selected, setSelected] = useState(false);

    const handleSelection = () => {
        selected === false ? setSelected(true) : setSelected(false);
    };

    // combine the two functions that handle card selection into one function for
    // use in onClick handler
    const handleClickAndSelect = (card) => {
        handleCardClick(card);
        handleSelection();
    }

    useEffect(() => {
        if (resetHand === true) {
            setSelected(false);
        }
    }, [resetHand])

    if (showFace === true) {
        return (
            <img 
                className={selected === true ? 'card selected' : 'card'} 
                src={`cards/${card}.svg`} 
                onClick={() => handleClickAndSelect(card)}
            />
        )
    } else {
        return (
            <img className='card' src={`cards/BLUE_BACK.svg`} />            
        )
    }
};

export default Card;