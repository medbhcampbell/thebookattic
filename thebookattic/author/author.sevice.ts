import axios from 'axios';

import { Author } from './author';

class AuthorService {
    private URI: string;
    constructor() {
        // Existing URI to be replaced with AWS Lambda URI
        this.URI = 'http://localhost:3000/authors';
    }

    getAllAuthors(): Promise<Author[]> {
        return axios.get(this.URI).then(result => result.data);
    }

    getAuthor(authorId: number): Promise<Author> {
        return axios.get(this.URI + '/' + authorId).then(result => result.data);
    }

    addAuthor(author: Author): Promise<null> {
        return axios.post(this.URI, author).then(result => null);
    }

    updateAuthor(author: Author): Promise<null> {
        return axios.put(this.URI, author).then(result => null);
    }

    removeAuthor(authorId: string): Promise<null> {
        return axios.delete(this.URI + '/' + authorId, {withCredentials: true}).then(result => null);
    }
}

const authorService = new AuthorService();
export default authorService;