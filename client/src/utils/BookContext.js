import React, { useState, createContext } from "react";

const BookContext = createContext();

export const BookContextProvider = props => {
    const [books, setBooks] = useState([]);
    const [notifications, setNotifications] = useState(0);

    return (
        <BookContext.Provider value={{books, setBooks, notifications, setNotifications}} >
            { props.children }
        </BookContext.Provider>
    );
};
export default BookContext;
