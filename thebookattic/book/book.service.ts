import axios from 'axios';

import { Book } from './book';

class BookService {
    private URI: string;
    constructor() {
        // Existing URI to be replaced with AWS Lambda URI
        this.URI = process.env.THEBOOKATTIC_URI + 'users';
    }

    addBook(book: Book): Promise<null> {
        return axios.post(this.URI, book)
            .then(result => null)
            .catch(err => {
                console.log(err);
                return null;
            });
    }

    approveBookById(bookId: number): Promise<null> {
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

    getBookRating(bookId: number): Promise<number> {
        return axios.get(this.URI+ '/ratings/' + bookId).then(result => result.data).catch(error => {console.error(error)});
    }
    
    getBooksToRead(username: string): Promise<Book[]> {
        return axios.get(this.URI + '/toread/' + username)
            .then(result => result.data)
            .catch((err)=> {
                console.log(err);
                return [];
            });
    }

    addBookToRead(username: string, bookid: number): Promise<boolean> {
        return axios.post(this.URI + '/toread/' + username, {"bookid": bookid})
            .then(result => result.data)
            .catch((err) => {
                console.log(err);
                return false;
            });
    }

    getBooksHaveRead(username: string): Promise<Book[]> {
        return axios.get(this.URI + '/haveread/' + username)
            .then(result => result.data)
            .catch((err)=> {
                console.log(err);
                return [];
            });
    }

    addBookHaveRead(username: string, bookid: number): Promise<boolean> {
        return axios.post(this.URI + '/haveread/' + username, {"bookid": bookid})
            .then(result => result.data)
            .catch((err) => {
                console.log(err);
                return false;
            });
    }
}

const bookService = new BookService();
export default bookService;
