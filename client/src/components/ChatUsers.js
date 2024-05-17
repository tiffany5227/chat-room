import React, { useEffect, useState } from 'react';
import '../style/ChatUsers.css';

const ChatUsers = ({socket}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('userResponse', (data) => setUsers(data));
    }, [socket, users]);

    return(
        <div id='chatUsers-box'>
            <h3>Active Users</h3>
            <div id="activeUsers-box">
                {users.map((user) =>
                    <p key={user.socketID}>{user.name}</p>
                )}
            </div>
        </div>  
    );
    
};

export default ChatUsers;