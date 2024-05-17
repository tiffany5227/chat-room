import React, { useEffect, useState } from 'react';
import '../style/ChatFooter.css';

const ChatFooter = ({socket}) => {
    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState('');
    const [startedTyping, setStartedTyping] = useState(false);

    useEffect(() => {
        socket.on('typingResponse', (data) => setTyping(data));
    }, [socket, typing]);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('username')) {
            socket.emit('message', {
              text: message,
              name: localStorage.getItem('username'),
              id: `${socket.id}${Math.random()}`,
              socketID: socket.id,
            });
        }
        setMessage('');
        setTyping('');
        socket.emit('doneTyping', '');
    }

    const handleTyping = (e) => {
        setMessage(e.target.value);
        
        if(e.target.value === ''){
            socket.emit('doneTyping', '');
        }else{
            socket.emit('typing', localStorage.getItem('username')+' is typing...');
        }
    }

    return(
        <div className="input-msg-box">
            <div id="user-type-box"><div id='user-typing'>{typing}</div></div>
            <div id="type-box">
                <form onSubmit={handleSend}>
                    <input autocomplete="off" type="text" placeholder="Start typing..." id="text-box" value={message} onChange={handleTyping}></input>
                    <button id="send-btn" type="submit">Send</button>
                </form>
            </div>
        </div>
    );
    
};

export default ChatFooter;