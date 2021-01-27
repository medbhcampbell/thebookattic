import { Client } from 'pg';

const client = new Client();

interface AuthorEvent {
    body: string
}

export const handler = async (event: AuthorEvent): Promise<any> => {
    let author: Author = JSON.parse(event.body) as Author;
    const result = await updateAuthor(author);
    client.end();
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    if (result) {
        return {
            headers: head,
            statusCode: 204
        };
    } else {
        return {
            headers: head,
            statusCode: 404
        };
    }
}

async function updateAuthor(author: Author): Promise<boolean> {
    const query = 
        `update authors 
        set 
            userid = ${author.userId}, 
            firstname = '${author.firstName}', 
            lastname = '${author.lastName}', 
            avgrating = '${author.avgRating}', 
            bio = '${author.bio}', 
            picture = '${author.picture}' 
        where id = ${author.authorId};`
    client.connect();
    try {
        await client.query(query);
        return true;
    } catch (error) {
        return false;
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