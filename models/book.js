module.exports = (mongoose) => {
    const Schema = mongoose.Schema;

    const bookSchema = new Schema ({
        title: {
            type: String,
            required: true,
        },
        textSnippet: {
            type: String,
        },
        authors: {
            type: Array,
        },
        publishedDate: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        link: {
            type: String,
        },
        bookId: {
            type: String,
            unique: true,
        }
    });

    const Book = mongoose.model('Book', bookSchema);

    return Book;
};
