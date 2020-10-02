import React from 'react';

const Card = ({ card, handleCardClick, showFace }) => {
    if (showFace === true) {
        return (
            <img className='card' src={`cards/${card}.svg`} onClick={() => handleCardClick(card)}/>
            )
    } else {
        return (
            <img className='card' src={`cards/BLUE_BACK.svg`} />            
        )
    }
};

export default Card;