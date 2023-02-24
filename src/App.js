import React from 'react';
import LoginBar from './Components/LoginBar';
import Contacts from './Components/Contacts';
import ChatWindow from './Components/ChatWindow';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <LoginBar />
            <Contacts />
            <ChatWindow />
        </div>
    );
};

export default App;
