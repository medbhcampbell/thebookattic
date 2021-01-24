// Author's page will contain a list of books by that author

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
    if(books) {
        return {statusCode: 200, body: JSON.stringify(books)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function getApprovedBooksByAuthor(authorid: number): Promise<Book[] | null> {
    return pool.query(`select * from thebookattic.books where approved=true and authorid=${authorid}`).then((res) => {
        return res.rows as Book[];
    }).catch((err) => {
        console.log(err);
        return null;
    });
}