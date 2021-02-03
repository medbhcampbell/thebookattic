import axios from 'axios';

import { Author } from './author';
class AuthorService {
    private URI: string;
    constructor() {
        // Existing URI to be replaced with AWS Lambda URI
        this.URI = process.env.THEBOOKATTIC_URI + 'authors';
    }

    getAllAuthors(): Promise<Author[]> {
        console.log('Frontend: Attempting to get author list');
        return axios
            .get(this.URI)
            .then((result) => result.data)
            .catch((error) => {
                console.error(error);
            });
    }

    getAuthorById(authorId: number): Promise<Author> {
        return axios
            .get(this.URI + '/' + authorId)
            .then((result) => result.data)
            .catch((error) => {
                console.error(error);
            });
    }

    getAuthorByUserId(userId: string): Promise<Author> {
        return axios
            .get(this.URI + '/' + userId)
            .then((result) => result.data)
            .catch((error) => {
                console.error(error);
            });
    }

    getAuthorRating(authorId: number): Promise<number> {
        return axios.get(this.URI+ '/ratings/' + authorId).then(result => result.data).catch(error => {console.error(error)});
    }

    addAuthor(author: Author): Promise<null> {
        console.log(
            'Frontend: attempting to add new author: ' + JSON.stringify(author)
        );
        return axios
            .post(this.URI, author)
            .then((result) => null)
            .catch((error) => error);
    }

    updateAuthor(author: Author): Promise<null> {
        console.log(
            'Frontend: attempting to update author: ' + JSON.stringify(author)
        );
        return axios
            .put(this.URI, author)
            .then((result) => null)
            .catch((error) => error);
    }

    removeAuthor(authorId: string): Promise<null> {
        console.log(
            'Frontend: attempting to remove author with id: ' +
                JSON.stringify(authorId)
        );
        return axios.delete(this.URI + '/' + authorId).then((result) => null);
    }
}

const authorService = new AuthorService();
export default authorService;
