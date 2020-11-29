module.exports = (mongoose) => {
    const router = require("express").Router();
    const db = require("../models")(mongoose);
    const axios = require('axios');  
    // API Routes: /api/
  
    router.get("/books", (_, res) => {
        db.Book.find({})
          .then(dbBooks => {
            res.json(dbBooks);
          })
          .catch(err => {
            res.status(400).json(err);
          });
    });

    router.post("/books", ({ body }, res) => {
      db.Book.findOne({
        bookId: body.bookId,
      }).then(response => {
        if (response !== null) {
          res.status(200).json('Already in database');
        } else {
          db.Book.create(body)
            .then(dbBooks => {
              res.json(dbBooks);
            })
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
          }

      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    });
  
  
    router.delete("/books/:id", ({ params }, res) => {
        db.Book.deleteOne({ bookId: params.id})
        .then(response => res.json(response))
        .catch(err => {
            res.status(400).json(err);
        });
    });

    router.get('/search/:searchString', ({ params }, res) => {
      const URL = `https://www.googleapis.com/books/v1/volumes?q=${ params.searchString }&key=${ process.env.GOOGLE_API }`;
      axios.get(URL)
      .then(response => response.data.items)
      .then(results => {
        const bookArray = [];
        results.forEach(book => {
          const textSnippet = book.searchInfo ? book.searchInfo.textSnippet : '';
          const authors = book.volumeInfo.authors ? book.volumeInfo.authors : [];
          const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : 'https://via.placeholder.com/150';
          
          bookArray.push({
            title: book.volumeInfo.title,
            textSnippet: textSnippet,
            authors: authors,
            publishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            image: image,
            link: book.volumeInfo.infoLink,
            bookId: book.id,
          });
        });
        res.json(bookArray);
      })
      .catch(error => console.log({ Error: error.message }));
    })
    
    return router;
  }
  