import React, { useState } from 'react';
import '../style/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [entered, setEntered] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setEntered(true);

    // regex to check special characters
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<> ]/;
    
    if (inputValue.length < 4 || inputValue.length > 14) {
        setError('Username must be between 4-14 characters.');
    } else if (specialCharRegex.test(inputValue)) {
        setError('Username must not contain special characters.');
    } else {
        setError('');
    }

    setUsername(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    socket.emit('newUser', {name: username, socketID: socket.id})
    navigate('/chat');
  };

  return (
    <div className="background">
        <div id="signup-box">
            <h2>Welcome to ChatRoom!</h2>
            <div id="username-rules-box">
                <div>Create a username to enter the chatroom, it</div>
                <ul>
                    <li>Must be between 4-14 characters</li>
                    <li>Must not contain any special characters</li>
                </ul>
            </div>
            <br/>
            <form onSubmit={handleSubmit}>
                <label>Enter your username:</label><br/>
                <input autocomplete="off" type="text" id="username" value={username} onChange={handleChange}></input>
                <div className="error">{error}</div>
                <br/>
                <button type="submit" disabled={!entered || error !== ''}>Go to ChatRoom</button>
            </form>
        </div>
    </div>
  );
};

export default Home;