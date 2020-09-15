import React from 'react';
import Card from './Card.jsx';

const CompHands = (props) => {
    return (
        <div className='compHands-container'>
            <div className='hand hhand-compact compTwo-hand'>
                {props.cards2.map((card, i) => (
                    <Card card={card} key={i}/>
                ))}
            </div>
            <div className='hand hhand-compact compThree-hand'>
                {props.cards3.map((card, i) => (
                    <Card card={card} key={i}/>
                ))}
            </div>
            <div className='hand hhand-compact compFour-hand'>
                {props.cards4.map((card, i) => (
                    <Card card={card} key={i}/>
                ))}
            </div>
        </div>
    )
};

export default CompHands;