import GenreService from 'genreservicelayer';

const genreService = new GenreService();

interface GenreEvent {
    path: string;
}

export const handler = async (event: GenreEvent): Promise<any> => {
    let id = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));

    const genre = await genreService.getGenreById(id);

    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    let response;
    if(genre) {
        response = {
            headers: head,
            statusCode: 200,
            body: JSON.stringify(genre)
        };
    } else {
        response = {
            headers: head,
            statusCode: 404,
            body: JSON.stringify({})
        };
    }
    return response;
};