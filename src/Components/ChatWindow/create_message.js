import { v4 as uuidv4 } from 'uuid';

const decodeMessage = (msg) => {
    const key = '%%JSON%%';
    if (msg.startsWith(key)) {
        msg = msg.replace(key, '');
        msg = msg.trim();
        return JSON.parse(msg);
    }
    return msg;
};

const encodeMessage = (data) => {
    if (data.type === 'object') {
        data.type = 'string';
        data.content = JSON.stringify(data.content, null, 4);
    }
    return data;
};

export const createMessage = (from, to, content) => {
    const msg = decodeMessage(content);
    const type = typeof msg;
    let user = {
        message_id: uuidv4(),
        from: from,
        to: to,
        data: {
            type: type,
            content: msg,
        },
        datetime: new Date(),
    };
    return user;
};

export const parseMessage = (message_data) => {
    // TODO: USE deepcopy
    let newMessageData = JSON.parse(JSON.stringify(message_data));
    newMessageData = encodeMessage(newMessageData);
    return newMessageData;
};
