import { v4 as uuidv4 } from 'uuid';

const getMessage = (msg) => {
    // TODO
};

export const createMessage = (from, to, content) => {
    const msg = getMessage(content);
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
