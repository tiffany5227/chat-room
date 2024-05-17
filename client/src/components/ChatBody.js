import React from 'react';
import '../style/ChatBody.css';

const ChatBody = ({messages, lastMessageRef}) => {
    return(
        <div id="chat-box">
            <div id='messages-box'>
                {messages.map((message) =>
                    message.name === localStorage.getItem('username')
                    ?
                    <div className="messages" key={message.id}>
                        <p className="sender">You</p>
                        <div className="sent-msgs">
                            <div>{message.text}</div>
                        </div>
                    </div>
                    :
                    <div className="messages" key={message.id}>
                        <p className="receiver">{message.name}</p>
                        <div className="received-msgs">
                            <div>{message.text}</div>
                        </div>
                    </div>
                )}
            </div>
            <div ref={lastMessageRef} />
            
        </div>  
    );
    
};

export default ChatBody;