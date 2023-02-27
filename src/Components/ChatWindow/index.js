import React, { useState, useEffect } from 'react';
import { IoPersonCircleSharp, IoSend } from 'react-icons/io5';
import { createMessage } from './create_message';
import './index.css';

const getDateStr = (datetime) => {
    if (typeof datetime === 'object') {
        let hr = datetime.getHours()
        let min = datetime.getMinutes()
        if (hr < 10)
            hr = "0" + String(hr)
        if (min < 10)
            min = "0" + String(min)
        return hr + ":" + min
    }
    return '';
};

const ChatWindow = ({ user, setUser, currentContact }) => {
    const [message, setMessage] = useState('');

    // const currentUser = user.about.name;

    const handleSubmitMessage = (e) => {
        e.preventDefault();

        if (
            !(message === undefined || message === '' || message.trim() === '')
        ) {
            const packMessage = createMessage(
                user.about.name,
                currentContact.name,
                message
            );
            // console.log(packMessage);
            user.conversations[currentContact.name] = [
                ...user.conversations[currentContact.name],
                packMessage,
            ];
            // console.log(user);
            setUser(user);
            setMessage("");
        }
    };

    // useEffect(() => {
    //     console.log('useEffect');
    // }, [user.conversations[currentContact.name]]);

    if (Object.keys(currentContact).length === 0) {
        return (
            <div className="chatwindow chatwindow__empty">
                Please Select a contact
            </div>
        );
    } else {
        return (
            <div className="chatwindow">
                <div className="chatwindow__contact">
                    <IoPersonCircleSharp className="chatwindow__contact--icon" />
                    {currentContact.name}
                </div>

                <div className="chatwindow__chat">
                    {user.conversations[currentContact.name].map(
                        (message, ind, arr) => {
                            let messageClass = 'chatwindow__chat__combined ';
                            if (
                                message.from === user.about.name &&
                                message.to === currentContact.name
                            )
                                messageClass += 'chatwindow__chat__from';
                            else if (
                                message.from === currentContact.name &&
                                message.to === user.about.name
                            )
                                messageClass += 'chatwindow__chat__to';

                            return (
                                <div key={ind} className={messageClass}>
                                    {message.data.content}
                                    <div className="chatwindow__chat__date">
                                        {getDateStr(message.datetime)}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>

                <div className="chatwindow__message">
                    <form
                        className="chatwindow__message__form"
                        onSubmit={handleSubmitMessage}
                    >
                        <input
                            type="text"
                            placeholder="Enter your message here"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="chatwindow__message__form--input"
                        />
                        <button
                            type="submit"
                            className="chatwindow__message__form--submit-button"
                        >
                            <IoSend className="chatwindow__message__form--submit-button--icon" />
                        </button>
                    </form>
                </div>
            </div>
        );
    }
};

export default ChatWindow;
