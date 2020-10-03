import React, { useState } from 'react';

const Card = ({ card, handleCardClick, showFace }) => {
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