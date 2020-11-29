import React, { useState } from 'react';
import './style.css';
import API from '../../utils/API';

function Book({book, setBooks, mode}) {
    const [save, setSave] = useState(false);

    const viewBook = (event) => {
        event.preventDefault();
        window.open(book.link, '_blank');
    }

    const saveBook = () => {
        const bookObject = {
            title: book.title,
            textSnippet: book.textSnippet,
            authors: book.authors,
            publishedDate: book.publishedDate,
            description: book.description,
            image: book.image,
            link: book.link,
            bookId: book.bookId,
        };
        
        API.addBook(bookObject).then((response) => {
            if (response.status === 200) {
                setSave(true);
            }
        });
    }
    
    const deleteBook = () => {
        API.deleteBook(book.bookId).then((response) => {
            if (response.status === 200) {
                API.getBooks()
                    .then(res => {
                        if (res.status === 200) {
                            setBooks(res.data);
                        }
                    });
            } else {
                console.log({ failed: response });
            }
        })
    }

    return (
    <div className='book'>
        <div className='bookHeader'>
            <h3>
                {book.title}
            </h3>
            <div className='buttonDiv'>
                <button
                    className='bookBtn'
                    onClick={(event) => viewBook(event)}
                >
                    View
                </button>
                { mode === 'Search' ?  
                    <button
                        className={ save ? 'bookBtn saved': 'bookBtn' }
                        onClick={saveBook}
                    >
                        { save ? 'Saved': 'Save' }
                    </button> :
                    <button
                        className='bookBtn'
                        onClick={deleteBook}
                    >
                        Delete
                    </button>
                }
            </div>
        </div>
        <br />
        {book.searchInfo ?
            <div>
                {book.textSnippet}
            </div>
            : <></>
        }
        <br />
        <div className='publishInfo'>
            <span>Written By: {book.authors.join(", ")}</span>
            <span>Published: {book.publishedDate}</span>
        </div>
        <br />
        <div className='descriptionContainer'>
            <img className='bookImg' src={book.image} alt={book.title}/>
            <p className='bookDescription'>
                {book.description}
            </p>
        </div>
        <br />
        <hr />
    </div>
    );
}
export default Book;
