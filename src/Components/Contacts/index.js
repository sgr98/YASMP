import React from 'react';
import './index.css';

const Contacts = ({ contacts, currentContact, setCurrentContact }) => {
    const handleClick = (contact) => {
        setCurrentContact(contact);
        // console.log('Current Contact selected to: ', currentContact);
    };

    if (contacts.length === 0) {
        return <div className="Contacts Contacts__empty">Please enter a valid User</div>;
    } else {
        return (
            <div className="Contacts">
                {contacts.map((contact, ind, arr) => {
                    return (
                        <div
							key={ind}
                            className="Contacts__contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(contact);
                            }}
                        >
                            {contact.name}
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default Contacts;
