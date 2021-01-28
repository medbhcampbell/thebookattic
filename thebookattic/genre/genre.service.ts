import axios from 'axios';

import Genre from './genre';

class GenreService {
    private URI: string;
    constructor() {
        this.URI = 'https://zp8675rt3l.execute-api.us-west-2.amazonaws.com/test/genres';
    }

    getGenres(): Promise<Genre[]> {
        return axios.get(this.URI).then((result) => result.data);
    }

    getGenreById(id: number): Promise<Genre> {
        return axios.get(this.URI + '/' + id).then((result) => result.data);
    }

    addGenre(name: string): Promise<null> {
        return axios.post(this.URI, name).then((result) => null);
    }

    removeGenre(id: string): Promise<null> {
        return axios
            .delete(this.URI + '/' + id, { withCredentials: true })
            .then((result) => null);
    }
}

const genreService = new GenreService();
export default genreService;
