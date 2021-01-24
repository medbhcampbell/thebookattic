// Admins can see a list of unnapproved books

import { Pool } from 'pg';
import dotenv from 'dotenv';

import { Book } from './book';

dotenv.config();
const pool = new Pool();

export const handler = async (): Promise<any> => {
    const books = await getApprovedBooks();
    if(books) {
        return {statusCode: 200, body: JSON.stringify(books)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function getApprovedBooks(): Promise<Book[] | null> {
    return pool.query('select * from thebookattic.books where approved=false').then((res) => {
        return res.rows as Book[];
    }).catch((err) => {
        console.log(err);
        return null;
    });
}