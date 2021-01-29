import GenreService from 'genreservicelayer';

const genreService = new GenreService();

export const handler = async (): Promise<any> => {

    const genres = await genreService.getGenres();

    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    let response;
    if(genres) {
        response = {
            headers: head,
            statusCode: 200,
            body: JSON.stringify(genres)
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