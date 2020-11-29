import React, { useEffect, useContext } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Book from '../components/book';
import BookContext from '../utils/BookContext';
import API from '../utils/API';
import './saved.css';

export default function SavedPage() {
    const [books, setBooks] = useContext(BookContext);

    useEffect(() => {
        API.getBooks()
            .then(response => {
                if (response.status === 200) {
                    setBooks(response.data);
                }
            });

    }, [setBooks]);

    return (
        <>
            <Navbar />
            <Hero />            
            <div className="savedDiv">
                <h2>Saved Books</h2>
                { books.map((book) =><Book
                        key={ 'bookId' + book.bookId }
                        book={book}
                        setBooks={setBooks}
                        mode='Saved'
                    />
                )}
            </div>
        </>
    );
}
