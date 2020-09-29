import React, { useState, useEffect } from 'react';

const MessageBoard = ({
    currentPlayer,
    alertMsg
}) => {
    const [messages, setMessages] = useState([]);

    const alertDiv = document.getElementById('alert');
    const msgs = {
        'pass': `Player ${currentPlayer + 1} has decided to pass`,
        'open': 'All other players have passed, play any card combination',
        'compOpen': `All other players have passed, Player ${currentPlayer + 1} will play any card`
    };

    useEffect(() => {
        const newMessages = [...messages];

        if (messages.length === 5) {
            // remove last message before adding a new one
            newMessages.pop();
        }

        newMessages.unshift(msgs[alertMsg]);
        setMessages(messages);
    }, [alertMsg])
    return (
        <div className='messages'>
            <div className='game-status'>{`Player ${currentPlayer + 1}'s Turn`}</div>
            <ul id='alert'>
                {messages.map((msg) => {
                    return <li>{msg}</li>
                })}
            </ul>
        </div>
    )
};

export default MessageBoard;