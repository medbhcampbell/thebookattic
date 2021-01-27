// Users will be able to filter books by genre

import { Pool } from 'pg';
import dotenv from 'dotenv';

import { Book } from './book';

dotenv.config();
const pool = new Pool();

interface GenreEvent {
    path: string;
}

export const handler = async (event: GenreEvent): Promise<any> => {
    let genreid = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    console.log(`fetching books in genre ${genreid}`);

    const books = await getApprovedBooksByGenre(genreid);
    pool.end();
    if(books) {
        console.log(JSON.stringify(books));
        return {statusCode: 200, body: JSON.stringify(books)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function getApprovedBooksByGenre(genreid: number): Promise<Book[] | null> {
    return pool.query('select * from thebookattic.books where approved=true and genreid=$1::integer', [genreid]).then((res) => {
        return res.rows as Book[];
    }).catch((err) => {
        console.log(err);
        return null;
    });
}