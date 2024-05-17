import React from 'react';
import '../style/ChatHeader.css';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {
    const navigate = useNavigate();

    const handleLeave = () =>{
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    }

    return(
        <div id="header">
            <h1>ChatRoom</h1>
            <button id="leave-btn" onClick={handleLeave}>LEAVE</button>
        </div>
    );
    
};

export default ChatHeader;