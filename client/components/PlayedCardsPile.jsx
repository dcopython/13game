import React from 'react';
import Card from './Card.jsx';

const PlayedCardsPile = (props) => {
    const { pile } = props;

    return (
        <Card card={pile[pile.length - 1]} showFace={true} />
    )
}

export default PlayedCardsPile;