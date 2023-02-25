import React, { useState, useEffect } from 'react';
import LoginBar from './Components/LoginBar';
import Contacts from './Components/Contacts';
import ChatWindow from './Components/ChatWindow';
import './App.css';
import USERS from './Data/Registry/users.json';
import USER1CONTACTS from './Data/User/User1/contacts.json';
import USER1 from './Data/User/User1/user.json';

const getData = (path) => {
    return require('json-loader!' + path);
};

const App = () => {
    const [username, setUsername] = useState('');
    const [contacts, setContacts] = useState([]);
    const [user, setUser] = useState({});

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const userExists = USERS.some((val) => {
            return val.name === username;
        });
        if (!userExists) {
            alert('Entered username does not exists!!!');
        } else {
            // TODO: Read user file and populate state: contacts and userChat
            // const contactsPath = './Data/User/' + username + '/contacts.json';
            // const userPath = './Data/User/' + username + '/user.json';
            // setContacts(getData(contactsPath))
            // setUser(getData(userPath))

            setContacts(USER1CONTACTS);
            setUser(USER1);
        }

        console.log(contacts);
        console.log(user);
    };

    const [currentContact, setCurrentContact] = useState('');

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
                <ChatWindow user={user} currentContact={currentContact} />
            </div>
        </div>
    );
};

export default App;
