import { Pool } from 'pg';
import dotenv from 'dotenv';

import * as getUnapprovedBooks from './getUnapprovedBooks';
import * as getBookById from './getBookById';
import * as getApprovedBooks from './getApprovedBooks';
import * as getApprovedBooksByAuthor from './getApprovedBooksByAuthor';
import * as getApprovedBooksByGenre from './getApprovedBooksByGenre';
import * as deleteBookById from './deleteBookById';
import * as approveBookById from './approveBookById';
import * as addBook from './addBook';
import { Book } from './book';

async function testHandlers() {
    
    dotenv.config();
    const pool = new Pool();

    console.log('getUnapprovedBooks:');
    await getUnapprovedBooks.handler();

    console.log('\ngetApprovedBooks:');
    await getApprovedBooks.handler();

    console.log('\ngetApprovedBooksByAuthor:');
    const authorEvt = { path: 'blablabla.com/authors/2/books' };
    await getApprovedBooksByAuthor.handler(authorEvt);

    console.log('\ngetApprovedBooksByGenre:');
    const genreEvt = { path: 'blablabla.com/genres/4' };
    await getApprovedBooksByGenre.handler(genreEvt);

    console.log('\ngetBookById:');
    const evt = { path: 'blablabla.com/books/1' };
    await getBookById.handler(evt);

    console.log('\naddBook');
    const book = new Book(
        1,
        'Northanger Abbey',
        'url',
        'The madness that comes of reading too many novels',
        200,
        'urlLink',
        7);
    const bookEvt = { body: JSON.stringify(book) };
    await addBook.handler(bookEvt);
    console.log('added book');
    await pool.query('select * from thebookattic.books').then((res) => {
        console.log(res.rows);
    });

    console.log('\napproveBook');
    const approveEvt = { path: 'blablabla.com/books/4'};
    await approveBookById.handler(approveEvt);
    await pool.query('select * from thebookattic.books').then((res) => {
        console.log(res.rows);
    });

    console.log('\ndeleteBook');
    const deleteEvt = { path: 'blablabla.com/books/4'};
    await deleteBookById.handler(deleteEvt);
    await pool.query('select * from thebookattic.books').then((res) => {
        console.log(res.rows);
    });

    pool.end();
}

testHandlers();