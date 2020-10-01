import React from 'react';

const PlacingBoard = ({ placing, endGame }) => {
    return (
        <div>
            <h2>{endGame === true ? 'Game Over!' : ''}</h2>
            <p>First Place: {placing[0] !== undefined ? `Player ${placing[0] + 1}` : ''}</p>
            <p>Second Place: {placing[1] !== undefined ? `Player ${placing[1] + 1}` : ''}</p>
            <p>Third Place: {placing[2] !== undefined ? `Player ${placing[2] + 1}` : ''}</p>
            <p>Last Place: {placing[3] !== undefined ? `Player ${placing[3] + 1}` : ''}</p>
        </div>
    )
};

export default PlacingBoard;