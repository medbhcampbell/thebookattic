// All users can see a list of all approved books

import { Pool } from 'pg';
import dotenv from 'dotenv';

import { Book } from './book';

dotenv.config();
const pool = new Pool();

export const handler = async (): Promise<any> => {
    const books = await getApprovedBooks();
    pool.end();
    if(books) {
        console.log(JSON.stringify(books));
        return {statusCode: 200, body: JSON.stringify(books)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function getApprovedBooks(): Promise<Book[] | null> {
    return pool.query('select * from thebookattic.books where approved=true').then((res) => {
        return res.rows as Book[];
    }).catch((err) => {
        console.log(err);
        return null;
    });
}