import axios from 'axios';
import { getJsonPort, getSendURL } from './utils.js';

export const postData = async (user) => {
    const port = getJsonPort(user.about.port);
    const userPath = getSendURL('http://localhost', port, ['conversations']);
    const res = await fetch(userPath, {
        method: 'POST',
        body: JSON.stringify(user.conversations),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    // console.log(res)
    // const data = await res.json();
    // console.log(data);
};

export const packRPCMessage = (func, message) => {
    const packMessage = {
        func: func,
        params: {
            message: message,
        },
    };
    return packMessage;
};

export const sendMessage = async (message, contact) => {
    const contactPort = getJsonPort(contact.port, 5);
    const sendURL = getSendURL('http://localhost', contactPort, ['listener']);
    const packMessage = packRPCMessage("SEND_MESSAGE", message);
    const res = await fetch(sendURL, {
        method: 'POST',
        body: packMessage,
        headers: {
            'Content-type': 'application/json',
        },
    });
    console.log(res)
};

export const sendMessageAxios = async (message, contact) => {
    const contactPort = getJsonPort(contact.port, 5);
    const sendURL = getSendURL('http://localhost', contactPort, ['listener']);
    const packMessage = packRPCMessage("SEND_MESSAGE", message);

    // const res = await fetch(sendURL, {
    //     method: 'POST',
    //     body: packMessage,
    //     headers: {
    //         'Content-type': 'application/json',
    //     },
    // });
    // console.log(res)

    const sendURLAxios = getSendURL('http://localhost', contactPort);
    const API = axios.create({ baseURL: sendURLAxios });
    const postMessageAPI = (messageBody) => API.post('/listener', messageBody);
    await postMessageAPI(packMessage);
};
