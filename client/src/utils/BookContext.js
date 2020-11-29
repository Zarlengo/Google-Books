import React, { useState, createContext } from "react";

const BookContext = createContext();

export const BookContextProvider = props => {
    const [books, setBooks] = useState([]);

    return (
        <BookContext.Provider value={[books, setBooks]} >
            { props.children }
        </BookContext.Provider>
    );
};
export default BookContext;
