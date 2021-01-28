import GenreService from 'genreservicelayer';

const genreService = new GenreService();

interface GenreEvent {
    path: string;
}

export const handler = async (event: GenreEvent): Promise<any> => {
    let id = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));

    const result = await genreService.removeGenre(id);

    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    let response;
    if(result) {
        response = {
            headers: head,
            statusCode: 204,
            body: 'Genre removed!'
        };
    } else {
        response = {
            headers: head,
            statusCode: 400,
            body: 'Error removing genre'
        };
    }
    return response;
};