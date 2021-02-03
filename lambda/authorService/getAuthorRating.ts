import { Client } from 'pg';

interface AuthorEvent {
    path: string
}

export const handler = async (event: AuthorEvent): Promise<any> => {
    let id = event.path.substring(event.path.lastIndexOf('/')+1, event.path.length);
    console.log(id);
    const authorId = Number(id);
    let rating: number | null;
    if(authorId) {
        console.log(`getting author rating by id ${authorId}`);
        rating = await getAuthorRatingById(authorId);
    } else {
        console.log(`getting author rating by username ${id}`);
        rating = await getAuthorRatingByUsername(id);
    }

    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    if (rating) {
        return {
            headers: head,
            statusCode: 200,
            body: rating.toString()
        };
    } else {
        return {
            headers: head,
            statusCode: 404, 
            body: JSON.stringify({})
        };
    }
}

async function getAuthorRatingById(authorId: number): Promise<number | null> {
    const query = `select avg(rating) from reviews r inner join books b on (r.bookid = b.id) where b.authorid = '${authorId}'`;
    console.log(query);
    let result: any;
    const client = new Client();
    await client.connect();
    try {
        result = await client.query(query);
        return Number(result.rows[0].avg);
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.end();
    }
}

async function getAuthorRatingByUsername(username: string): Promise<number | null> {
    const query = `select avg(rating) from reviews r inner join books b on r.bookid = b.id where b.authorid = 
	    (select id from authors where userid = '${username}')`;
    let result: any;
    const client = new Client();
    await client.connect();
    try {
        result = await client.query(query);
        return Number(result.rows[0].avg);
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.end();
    }
}