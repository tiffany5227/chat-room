import React, { useEffect, useState, useRef } from 'react';
import ChatUsers from '../components/ChatUsers';
import ChatHeader from '../components/ChatHeader';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import '../style/Chat.css';

const Chat = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    return(
        <div id="chatpage">
            <ChatUsers socket={socket} />
            <div className="main">
                <ChatHeader />
                <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
                <ChatFooter socket={socket}/>
            </div>
        </div>
    );
};

export default Chat;
