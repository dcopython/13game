import React from 'react';
import Card from './Card.jsx';

const PlayedCardsPile = ({ pile }) => {
    return (
        <div className='playedPile hand hhand-compact'>
            {pile.map((card) => (
                <Card card={card} showFace={true} />
            ))}
        </div>
    )
}

export default PlayedCardsPile;