import axios from 'axios';

import { Book } from './book';

class BookService {
    private URI: string;
    constructor() {
        // Existing URI to be replaced with AWS Lambda URI
        this.URI = 'https://zp8675rt3l.execute-api.us-west-2.amazonaws.com/test/books';
    }

    addBook(book: Book): Promise<null> {
        return axios.post(this.URI, book)
            .then(result => null)
            .catch(err => {
                console.log(err);
                return null;
            });
    }

    approveBookById(bookId: string): Promise<null> {
        // This may not be the best method/uri to call, feel free to change
        return axios.patch(this.URI + '/' + bookId).then(result => null);
    }

    deleteBookById(bookId: number): Promise<null> {
        return axios.delete(this.URI + '/' + bookId).then(result => null);
    }

    getApprovedBooks(): Promise<Book[]> {
        // Again, feel free to change this uri to better fit our Lambda routes
        return axios.get(this.URI + '/approved').then(result => result.data);
    }

    getApprovedBooksByAuthor(authorId: string): Promise<Book[]> {
        return axios.get(this.URI + '/approved/author/' + authorId).then(result => result.data);
    }

    getApprovedBooksByGenre(genreId: string): Promise<Book[]> {
        return axios.get(this.URI + '/approved/genre/' + genreId).then(result => result.data);
    }

    getBookById(bookId: string): Promise<Book> {
        return axios.get(this.URI + '/' + bookId).then(result => result.data);
    }

    getUnapprovedBooks(): Promise<Book[]> {
        // Again, feel free to change this uri to better fit our Lambda routes
        return axios.get(this.URI + '/unapproved').then(result => result.data);
    }

    getAllBooks(): Promise<Book[]> {
        return axios.get(this.URI).then(result => {
            if (result.data) {
                return result.data;
            }
            else {
                console.error('Error getting books');
                return [];
            }
        }).catch((err) => {
            console.error('Could not connect to backend');
            return [];
        });
    }

    getBooksToRead(username: string): Promise<Book[]> {
        return axios.get(this.URI + '/toread/' + username)
            .then(result => result.data)
            .catch((err)=> {
                console.log(err);
                return [];
            });
    }
}

const bookService = new BookService();
export default bookService;
