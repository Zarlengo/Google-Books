import React, { useState, createContext, useEffect } from "react";

const BookContext = createContext();

export const BookContextProvider = props => {
    const [books, setBooks] = useState([]);
    const [notifications, setNotifications] = useState(0);
    const [notificationArray, setNotificationArray] = useState([]);

    useEffect(() => {
        const savedArray = JSON.parse(localStorage.getItem('changedBooks'))
        setNotificationArray(savedArray);
        setNotifications(savedArray.length);
    }, []);

    return (
        <BookContext.Provider
            value={
                {
                    books,
                    setBooks,
                    notifications,
                    setNotifications,
                    notificationArray,
                    setNotificationArray,
                }
            } >
            { props.children }
        </BookContext.Provider>
    );
};
export default BookContext;
