import { Client } from 'pg';

const client = new Client();

export const handler = async (): Promise<any> => {
    client.connect();
    let authors = await getAllAuthors();
    client.end();
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    if (authors) {
        return {
            headers: head,
            statusCode: 200, 
            body: JSON.stringify(authors)
        };
    } else {
        return {
            headers: head,
            statusCode: 404, 
            body: JSON.stringify({})
        };
    }
}

async function getAllAuthors(): Promise<Author[] | null> {
    const query = 'select * from authors;';
    let result: any;
    try {
        result = await client.query(query);
        return result.rows;
    } catch (error) {
        return null;
    } finally {
        client.end();
    }
}

class Author {
    // ID for the author's page vs ID for the author's user account
    authorId: number = 0;
    userId: number = 0;
    firstName: string = '';
    lastName: string = '';

    // Average rating for the author based on the ratings for their books
    avgRating: number = 0;
    bio: string = '';

    // Location of the author's picture
    picture: string = '';
}