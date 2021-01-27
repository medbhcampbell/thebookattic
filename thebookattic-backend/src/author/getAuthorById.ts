import { Client } from 'pg';

const client = new Client();

interface AuthorEvent {
    path: string
}

export const handler = async (event: AuthorEvent): Promise<any> => {
    let authorId = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    const author = await getAuthorById(authorId);
    client.end();
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    if (author) {
        return {
            headers: head,
            statusCode: 200, 
            body: JSON.stringify(author)
        };
    } else {
        return {
            headers: head,
            statusCode: 404, 
            body: JSON.stringify({})
        };
    }
}

async function getAuthorById(authorId: number): Promise<Author | null> {
    const query = `select * from authors where id = '${authorId}'`;
    let result: any;
    client.connect();
    try {
        result = await client.query(query)
        return result.rows[0];
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

    constructor(authorId: number, userId: number, firstName: string, lastName: string, avgRating: number, bio: string, picture: string) {
        this.authorId = authorId;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avgRating = avgRating;
        this.bio = bio;
        this.picture = picture;
    }
}