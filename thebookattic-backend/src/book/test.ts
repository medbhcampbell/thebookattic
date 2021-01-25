import dotenv from 'dotenv';
import { Pool } from 'pg';
import * as getUnapprovedBooks from './getUnapprovedBooks';
import * as getBookById from './getBookById';
import * as getApprovedBooks from './getApprovedBooks';
import * as getApprovedBooksByAuthor from './getApprovedBooksByAuthor';
import * as getApprovedBooksByGenre from './getApprovedBooksByGenre';
import * as deleteBookById from './deleteBookById';
import * as approveBookById from './approveBookById';
import * as addBook from './addBook';

async function testHandlers() {
    
    console.log('getUnapprovedBooks:');
    await getUnapprovedBooks.handler();

    console.log('\ngetApprovedBooks:');
    await getApprovedBooks.handler();

    console.log('\ngetApprovedBooksByAuthor:');
    const authorEvt = { path: 'blablabla.com/authors/1' };
    await getApprovedBooksByAuthor.handler(authorEvt);

    console.log('\ngetBookById:');
    const evt = { path: 'blablabla.com/books/1' };
    await getBookById.handler(evt);
}

testHandlers();