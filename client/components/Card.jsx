import React, { useState } from 'react';

const Card = ({ card, handleCardClick, showFace }) => {
    const [selected, setSelected] = useState(false);

    const handleSelection = () => {
        selected === false ? setSelected(true) : setSelected(false);
    };

    if (showFace === true) {
        return (
            <img 
                className={selected === true ? 'card selected' : 'card'} 
                src={`cards/${card}.svg`} 
                onClick={() => handleCardClick(card)}
                onClick={handleSelection}
            />
        )
    } else {
        return (
            <img className='card' src={`cards/BLUE_BACK.svg`} />            
        )
    }
};

export default Card;