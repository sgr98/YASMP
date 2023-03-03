import { getJsonPort } from "./utils.js";

export const getData = async (path) => {
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