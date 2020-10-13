import React, { useState, useEffect } from 'react';

const MessageBoard = ({
    currentPlayer,
    alertMsg,
    setAlertMsg
}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        /* 
            @param {string, number, string[]} alertMsg
            @param {number} player
            @param {string[]} cards
        */
        if (alertMsg !== null) {
            while (alertMsg.length > 0) {
                const msg = alertMsg[0];
                const newMessages = [...messages];
                const player = msg[1];
                const cards = msg[2];
                const msgs = {
                    'play': `Player ${player + 1} played ${cards}`,
                    'pass': `Player ${player + 1} has decided to pass`,
                    'open': 'All other players have passed, play any card combination',
                    'compOpen': `All other players have passed, Player ${player + 1} will play any card`,
                    'invalid': 'Value is too low, please pick a higher value card or card combo',
                    'length': 'The amount of cards you are trying to play does not match current amount of cards in play',
                    'badPattern': 'The combo you are trying to play does not match current combo in play'
                };
        
                if (messages.length === 5) {
                    newMessages.pop();
                } 
                
                newMessages.unshift(msgs[msg[0]]);
                setMessages(newMessages);
                alertMsg.pop();
                setAlertMsg(alertMsg);
            }
            setAlertMsg(null);
        }
    }, [alertMsg]);

    return (
        <div className='messages'>
            <div className='game-status'>{`Player ${currentPlayer + 1}'s Turn`}</div>
            <ul id='alert'>
                {messages.map((msg, i) => {
                    return <li key={i}>{msg}</li>
                })}
            </ul>
        </div>
    )
};

export default MessageBoard;