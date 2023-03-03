import { getJsonPort, getSendURL } from "./utils.js";

export const postData = async (user) => {
    const port = getJsonPort(user.about.port);
    const userPath = getSendURL('http://localhost', port, ["conversations"]);
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

export const sendMessage = async (message, contact) => {
    const sendURL = getSendURL('http://localhost', contact.port, ["listener"]);
    const res = await fetch(sendURL, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
}