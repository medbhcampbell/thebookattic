import GenreService from 'genreservicelayer';

const genreService = new GenreService();

interface GenreEvent {
    body: string;
}

export const handler = async (event: GenreEvent): Promise<any> => {
    // event.body should just be a single string in this case (the name of the genre)
    const result = await genreService.addGenre(event.body);

    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    let response;
    if(result) {
        response = {
            headers: head,
            statusCode: 200,
            body: 'Genre added!'
        };
    } else {
        response = {
            headers: head,
            statusCode: 400,
            body: 'Error adding genre'
        };
    }
    return response;
};