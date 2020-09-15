import React from 'react';

const Card = (props) => {
    const { card, handleCardClick } = props;

    if (props.showFace === true) {
        return (
            <img className='card' src={`cards/${props.card}.svg`} onClick={() => handleCardClick(card)}/>
            )
    } else {
        return (
            <img className='card' src={`cards/BLUE_BACK.svg`} />            
        )
    }
};

export default Card;