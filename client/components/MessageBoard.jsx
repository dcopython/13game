import React, { useState, useEffect } from 'react';

const MessageBoard = ({
    currentPlayer,
    alertMsg,
    setAlertMsg
}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (alertMsg !== null) {
            console.log(alertMsg);
            const newMessages = [...messages];
            const player = alertMsg[1];
            const card = alertMsg[2];
            const msgs = {
                'play': `Player ${player + 1} played ${card}`,
                'pass': `Player ${player + 1} has decided to pass`,
                'open': 'All other players have passed, play any card combination',
                'compOpen': `All other players have passed, Player ${player + 1} will play any card`
            };
    
            if (messages.length === 5) {
                // remove last message before adding a new one
                newMessages.pop();
            } 
            
            newMessages.unshift(msgs[alertMsg[0]]);
            setMessages(newMessages);
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