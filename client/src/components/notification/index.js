import React, { useContext, useEffect, useState } from 'react';
import BookContext from "../../utils/BookContext";
import NotificationRow from "../NotificationRow";
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
    const [showNotifications, setShowNotifications] = useState(false);

    const {
            notifications, 
            setNotifications, 
            notificationArray,
            setNotificationArray,
        } = useContext(BookContext);

    useEffect(() => {
        socket.on('book change', payload => {
            setNotifications(notifications + 1);

            if (notificationArray.filter(element => element.book === payload.book).length === 0) {
                localStorage.setItem('changedBooks', JSON.stringify([...notificationArray, payload]));
                setNotificationArray([...notificationArray, payload]);
            }


        });
    });
        
    useEffect(() => {
        document.title = `${notifications} new books have been changed`;
    }, [notifications]);

    const handleMouseOver = (state) => {
        setShowNotifications(state);
    };

    const handleMouseClick = (event) => {
        event.preventDefault();
        setNotifications(0);
        setNotificationArray([]);
        localStorage.setItem('changedBooks', JSON.stringify([]));
    };

    return (
        <React.Fragment>
            <div
                className="notification"
                onMouseOver={ () => handleMouseOver(true) }
                onMouseOut= { () => handleMouseOver(false) }
                onClick={ (event) => handleMouseClick(event) }
            >
                <FontAwesomeIcon icon={ faBookOpen } />
                { notifications > 0 ? <span className="badge">{ notifications }</span> : '' }
            </div>
            { showNotifications ? 
                <div
                    className="notification-drop-down"
                    onMouseOver={ () => handleMouseOver(true) }
                    onMouseOut= { () => handleMouseOver(false) }
                >
                    {notificationArray.map(row => 
                        <NotificationRow
                            notification={row}
                            key={row.book}
                        />
                    )}
                </div> : <></>
            }
        </React.Fragment>
    );
}

export const handleNewMessage = (method, book) => {
    socket.emit('book', {
        method,
        book,
    });
}

export default Notification;