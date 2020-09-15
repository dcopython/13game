import React from 'react';
import Card from './Card.jsx';

const PlayerHand = (props) => {
    const { cards, handleCardClick } = props;

    return (
        <div className='playerHand-container'>
            <h5>Your Hand:</h5>
            <div className='hand hhand-compact active-hand'>
                {cards.map((card, i) => (
                    <Card card={card} key={i} showFace={true} handleCardClick={handleCardClick} />
                ))}
            </div>
        </div>
    )
}

export default PlayerHand;