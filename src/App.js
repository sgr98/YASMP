import React, { useState, useEffect } from 'react';
import LoginBar from './Components/LoginBar';
import Contacts from './Components/Contacts';
import ChatWindow from './Components/ChatWindow';

import { getData } from './Utilities/get.js';
import { getJsonPort, getSendURL } from './Utilities/utils.js';

import './App.css';
import USERS from './Data/Registry/users.json';

import ReceiveWorker from './Workers/receive.worker.js';

const App = () => {
    // const documentURI = document.documentURI
    // console.log(documentURI)

    // TODO: Workers
    const receiveWorker = new ReceiveWorker();
    // receiveWorker.postMessage("receive")

    // State
    const [username, setUsername] = useState('');
    const [contacts, setContacts] = useState([]);
    const [user, setUser] = useState({});
    const [currentContact, setCurrentContact] = useState({});

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const userExists = USERS.some((val) => {
            return val.name === username;
        });

        setContacts([]);
        setUser({});
        setCurrentContact({});

        if (!userExists) {
            alert('Entered username does not exists!!!');
        } else {
            const userPort = USERS.filter((val, ind, arr) => {
                return val.name === username;
            });
            const port = getJsonPort(userPort[0].port);
            // console.log(port);

            const userPath = getSendURL('http://localhost', port);
            const userSpace = await getData(userPath);
            // console.log(userSpace);
            setContacts(userSpace.contacts);
            setUser(userSpace);
        }
    };

    return (
        <div className="App">
            <div className="App__LoginBar">
                <LoginBar
                    username={username}
                    setUsername={setUsername}
                    handleLoginSubmit={handleLoginSubmit}
                />
            </div>
            <div className="App__Chat">
                <Contacts
                    contacts={contacts}
                    currentContact={currentContact}
                    setCurrentContact={setCurrentContact}
                />
                <ChatWindow
                    user={user}
                    setUser={setUser}
                    currentContact={currentContact}
                />
            </div>
        </div>
    );
};

export default App;
