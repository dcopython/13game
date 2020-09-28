import React from 'react';
import Card from './Card.jsx';

const PlayedCardsPile = (props) => {
    const { pile } = props;

    return (
        <div className='playedPile'>
            <Card card={pile[pile.length - 1]} showFace={true} />
        </div>
    )
}

export default PlayedCardsPile;