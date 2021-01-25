// Author's page will contain a list of books by that author
// Not sure how the route will look for this: authors/:authorid should
//   get info about author AND this list.
//   Could use authors/:authorid/books ??? Ask Richard?
//   TODO: figure out route

import { Pool } from 'pg';
import dotenv from 'dotenv';

import { Book } from './book';

dotenv.config();
const pool = new Pool();

interface AuthorEvent {
    path: string;
}

export const handler = async (event: AuthorEvent): Promise<any> => {
    let authorid = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    console.log(`fetching books by author ${authorid}`);

    const books = await getApprovedBooksByAuthor(authorid);
    pool.end();
    if(books) {
        return {statusCode: 200, body: JSON.stringify(books)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function getApprovedBooksByAuthor(authorid: number): Promise<Book[] | null> {
    return pool.query('select * from thebookattic.books where approved=true and authorid=$1::integer', [authorid]).then((res) => {
        return res.rows as Book[];
    }).catch((err) => {
        console.log(err);
        return null;
    });
}