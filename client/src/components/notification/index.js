import React, { useContext, useEffect } from 'react';
import BookContext from "../../utils/BookContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

import './style.css';

const io = require('socket.io-client');
const socket = io({
    withCredentials: true,
    extraHeaders: {
        "google-books-header": "header-content"
    }
});

function Notification() {
    const { notifications, setNotifications } = useContext(BookContext);

    useEffect(() => {  
        socket.on('book change', payload => {
            console.log(payload);
            setNotifications(notifications + 1);
        });
    });
        
    useEffect(() => {
        console.log('received new message');
        document.title = `${notifications} new books have been changed`;
    }, [notifications]); //only re-run the effect if new message comes in


    return (
        <div className="notification">
            <FontAwesomeIcon icon={ faBookOpen } />
            { notifications > 0 ? <span className="badge">{ notifications }</span> : '' }
        </div>
    );
}

export const handleNewMessage = (method, book) => {
    console.log('emitting new message');
    socket.emit('book', {
        method,
        book,
    });
}

export default Notification;