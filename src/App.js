import React, { useState } from 'react';
import LoginBar from './Components/LoginBar';
import Contacts from './Components/Contacts';
import ChatWindow from './Components/ChatWindow';

import './App.css';
import USERS from './Data/Registry/users.json';

import SendWorker from './Workers/send.worker.js';
// import ReceiveWorker from './Workers/receive.worker.js';

const getJsonPort = (port) => {
    const prt = parseInt(port);
    const ind = prt % 4000;
    return String(3000 + ind);
};

const getData = async (path) => {
    // console.log(path)
    const aboutPath = path + 'about';
    const contactsPath = path + 'contacts';
    const conversationsPath = path + 'conversations';

    const aboutRes = await fetch(aboutPath);
    const contactsRes = await fetch(contactsPath);
    const conversationsRes = await fetch(conversationsPath);

    const aboutData = await aboutRes.json();
    const contactsData = await contactsRes.json();
    const conversationsData = await conversationsRes.json();

    let userSpace = {
        about: aboutData,
        contacts: contactsData,
        conversations: conversationsData,
    };
    return userSpace;
};

const App = () => {
    // Workers
    let sendWorker;
    let receiveWorker;

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
            sendWorker = null;
            receiveWorker = null;
        } else {
            const userPort = USERS.filter((val, ind, arr) => {
                return val.name === username;
            });
            const port = getJsonPort(userPort[0].port);
            // console.log(port);

            const userPath = 'http://localhost:' + port + '/';
            const userSpace = await getData(userPath);
            // console.log(userSpace);
            setContacts(userSpace.contacts);
            setUser(userSpace);

            // TODO: Add workers here
            // Send Worker will be sent as a prop to ChatWindow
            sendWorker = new SendWorker();
            // receiveWorker = new ReceiveWorker();
            sendWorker.postMessage({ a: 'my message' });
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
                    // sendWorker={sendWorker}
                    // receiveWorker={receiveWorker}
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
