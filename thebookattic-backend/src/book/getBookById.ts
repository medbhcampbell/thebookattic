// Can see all info about a book from its id
// If book is unapproved and the user is not admin/the book's author, we should redirect
// But that will happen on the frontend, as it is roleguarding

import { Pool } from 'pg';
import dotenv from 'dotenv';

import { Book } from './book';

dotenv.config();
const pool = new Pool();

interface BookEvent {
    path: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    let bookid = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    console.log(`fetching book ${bookid}`);

    const book = await getBookById(bookid);
    pool.end();
    if(book) {
        console.log(JSON.stringify(book));
        return {statusCode: 200, body: JSON.stringify(book)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function getBookById(bookid: number): Promise<Book | null> {
    return pool.query('select * from thebookattic.books where id=$1::integer', [bookid]).then((res) => {
        return res.rows[0] as Book;
    }).catch((err) => {
        console.log(err);
        return null;
    });
}