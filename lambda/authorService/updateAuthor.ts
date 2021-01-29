import { Client } from 'pg';

interface AuthorEvent {
    body: string
}

export const handler = async (event: AuthorEvent): Promise<any> => {
    let author: any = event;
    console.log(author);
    const result = await updateAuthor(author);
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
    const client = new Client();
    const query = 
        `update authors 
        set 
            userid = ${author.userid}, 
            firstname = '${author.firstname}', 
            lastname = '${author.lastname}', 
            avgrating = '${author.avgrating}', 
            bio = '${author.bio}', 
            picture = '${author.picture}' 
        where id = ${author.authorid};`
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
    authorid: number = 0;
    userid: string = '';
    firstname: string = '';
    lastname: string = '';

    // Average rating for the author based on the ratings for their books
    avgrating: number = 0;
    bio: string = '';

    // Location of the author's picture
    picture: string = '';
}