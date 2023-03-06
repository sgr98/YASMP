import React, { useState, useEffect } from 'react';
import { IoPersonCircleSharp, IoSend } from 'react-icons/io5';
import { createMessage, parseMessage } from './create_message';

import {
    postData,
    sendMessage,
    sendMessageAxios,
} from './../../Utilities/post.js';
import { getDateStr } from './../../Utilities/utils.js';

import './index.css';

// import SendWorker from './../../Workers/send.worker.js';

const ChatWindow = ({ user, setUser, currentContact }) => {
    // TODO: Workers
    // const sendWorker = new SendWorker();

    const [message, setMessage] = useState('');

    const handleSubmitMessage = async (e) => {
        e.preventDefault();

        if (
            !(message === undefined || message === '' || message.trim() === '')
        ) {
            const packMessage = createMessage(
                user.about.name,
                currentContact.name,
                message
            );
            user.conversations[currentContact.name] = [
                ...user.conversations[currentContact.name],
                packMessage,
            ];
            // console.log(user);

            // TODO: for using send worker
            // sendWorker.postMessage(packMessage)
            // await sendMessage(packMessage, currentContact);
            await sendMessageAxios(packMessage, currentContact);

            await postData(user);
            setUser(user);
            setMessage('');
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

                            if (message.data.type !== 'string')
                                messageClass += ' chatwindow__chat__notobject';

                            const displayMessageData = parseMessage(
                                message.data
                            );

                            return (
                                <div key={ind} className={messageClass}>
                                    {displayMessageData.content}
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
