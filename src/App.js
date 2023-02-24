import React, { useState } from 'react';
import LoginBar from './Components/LoginBar';
import Contacts from './Components/Contacts';
import ChatWindow from './Components/ChatWindow';
import './App.css';

const App = () => {
    const [user, setUser] = useState('');
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        // const 
    };

    return (
        <div className="App">
            <div className="App__LoginBar">
                <LoginBar
                    user={user}
                    setUser={setUser}
                    handleLoginSubmit={handleLoginSubmit}
                />
            </div>
            <div className="App__Chat">
                <Contacts />
                <ChatWindow />
            </div>
        </div>
    );
};

export default App;
