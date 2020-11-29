import axios from 'axios';

export default {
    search: ({searchString}) => {
        return axios.get(`./api/search/${searchString}`);
    },

    addBook: (bookObject) => {
        return axios.post('./api/books', bookObject);
    },
    
    getBooks: () => {
        return axios.get('./api/books');
    },

    deleteBook: (bookId) => {
        return axios.delete(`./api/books/${ bookId }`);
    }
};
