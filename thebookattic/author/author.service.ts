import axios from 'axios';

import { Author } from './author';

class AuthorService {
    private URI: string;
    constructor() {
        // Existing URI to be replaced with AWS Lambda URI
        this.URI = 'https://7g4a8osr79.execute-api.us-east-1.amazonaws.com/dev/authors';
    }

    getAllAuthors(): Promise<Author[]> {
        console.log('Frontend: Attempting to get author list');
        return axios.get(this.URI).then(result => result.data).catch(error => {console.error(error)});
    }

    getAuthor(authorId: number): Promise<Author> {
        return axios.get(this.URI + '/' + authorId).then(result => result.data).catch(error => error);
    }

    addAuthor(author: Author): Promise<null> {
        return axios.post(this.URI, author).then(result => null).catch(error => error);
    }

    updateAuthor(author: Author): Promise<null> {
        return axios.put(this.URI, author).then(result => null).catch(error => error);
    }

    removeAuthor(authorId: string): Promise<null> {
        return axios.delete(this.URI + '/' + authorId, {withCredentials: true}).then(result => null);
    }
}

const authorService = new AuthorService();
export default authorService;