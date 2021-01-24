// Authors can add books to the database

import { Pool } from 'pg';
import dotenv from 'dotenv';

import { Book } from './book';

dotenv.config();
const pool = new Pool();

interface BookEvent {
    body: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    let book: Book = JSON.parse(event.body) as Book;
    console.log(`adding book ${JSON.stringify(book)}`);

    const added = await addBook(book);
    pool.end();
    if(added) {
        return {statusCode: 201, body: JSON.stringify(book)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function addBook(book: Book): Promise<boolean> {
    const q = 'insert into books (authorid, title, cover, blurb, page_count, link, genreid) values($1::integer, $2::text, $3::text, $4::text, $5::integer, $6::text, $7::integer)';
    const args = [book.authorId, book.title, book.cover, book.blurb, book.pageCount, book.link, book.genre];
    return pool.query(q, args).then((res) => {
        return true;
    }).catch((err) => {
        console.log(err);
        return false;
    });
}