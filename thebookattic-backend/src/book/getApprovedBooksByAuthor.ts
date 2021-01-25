// Author's page will contain a list of books by that author
// Not sure how the route will look for this: authors/:authorid should
//   get info about author.
//   Could use authors/:authorid/books ??? Using this for now
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
    //route endpoint should be authors/:authorid/books
    const endStr = event.path.lastIndexOf('/');
    // console.log(`path is: ${event.path}`);
    // console.log(`endStr is: ${endStr}`);
    const authorIdStr = event.path.substring(event.path.lastIndexOf('/', endStr-1)+1, endStr);
    // console.log(`substr is: ${authorIdStr}`);
    let authorid = Number(authorIdStr);
    console.log(`fetching books by author ${authorid}`);

    const books = await getApprovedBooksByAuthor(authorid);
    pool.end();
    if(books) {
        console.log(JSON.stringify(books));
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