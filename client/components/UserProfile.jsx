import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [friends, setFriends] = useState([]);
    const [friendName, setFriendName] = useState('')

    const updateFriends = () => {
        axios.get('/api/friends')
            .then((response) => {
                setFriends(response.data.friends);
            })
            .catch((error) => {
                console.log('Error getting friend list: ', error);
            })
    }

    useEffect(() => {
        axios.get('/api/friends')
            .then((response) => {
                setFriends(response.data.friends);
            })
            .catch((error) => {
                console.log('Error getting friend list: ', error);
            })
    },[]);

    const handleFriendName = ({ target }) => {
        const { value } = target;

        setFriendName(value);
    }

    const handleFriendSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/update', {
            name: `${friendName}`
        })
        .then((response) => {
            updateFriends();
            setFriendName('');
        })
        .catch((error) => {
            console.log('Error adding friend: ', error);
        })
    }

    return (
        <div className='userProfile'>
            <h5>Logged in as Daniel</h5>
            <p>Wins: 11 / Losses: 5</p>
            <div className='friendList'>
                <h5>Friends List:</h5>
                <div className='addFriend'>
                    <input type='text' name='friendName' value={friendName} onChange={handleFriendName}></input>
                    <button type='button' className='addFriend-btn' onClick={handleFriendSubmit}>Add Friend</button>
                </div>
                {friends.length === 0 ? 'Loading' : 
                    friends.map((friend, i) => (
                        <div className='friend' key={i}>
                            <span className='dot'></span>
                            <p>{friend}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default UserProfile;