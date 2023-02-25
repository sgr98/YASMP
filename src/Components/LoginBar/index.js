import React from 'react';
import './index.css';

const LoginBar = ({username, setUsername, handleLoginSubmit}) => {
    return (
        <div className="LoginBar">
            <form className="LoginBar__form" onSubmit={handleLoginSubmit}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="LoginBar__form--input"
                />
                <button type="submit" className="LoginBar__form--submit-button">
                    SUBMIT
                </button>
            </form>
        </div>
    );
};

export default LoginBar;
