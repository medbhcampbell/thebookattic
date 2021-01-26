import { Client } from 'pg';

const client = new Client();

interface AuthorEvent {
    body: string
}

export const handler = async (event: AuthorEvent): Promise<any> => {
    let author: Author = JSON.parse(event.body) as Author;
    const result = await addAuthor(author);
    client.end();
    if (result) {
        return {statusCode: 204};
    } else {
        return {statusCode: 400};
    }
}

async function addAuthor(author: Author): Promise<boolean> {
    const query = 
    `insert into authors (userid, firstname, lastname, avgrating, bio, picture) 
    values (
        '${author.userId}', 
        '${author.firstName}', 
        '${author.lastName}', 
        '${author.avgRating}', 
        '${author.bio}', 
        '${author.picture}'
    )`
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