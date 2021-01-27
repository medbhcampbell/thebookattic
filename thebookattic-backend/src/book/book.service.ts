// This file is just for testing with express! Should be replaced with Lambda
import dotenv from 'dotenv';
import { Client } from 'pg';

import logger from '../log';
import { Book } from './book';

dotenv.config();

class BookService {

    async getBooks(): Promise<Book[] | null> {
        logger.debug('Backend: Retreiving book list');
        const client = new Client();
        await client.connect();
        const query = 'select * from books';
        const result = await client.query(query).catch((err)=>{
            logger.error('Oh no! '+err);
            return null;
        });
        await client.end();
        if (result && result.rows) {
            logger.debug('Backend: Succesfully retrieved book list');
            logger.trace(result.rows);
            return result.rows;
        } else {
            logger.error('Backend: Failed to retrieve book list');
            return null;
        }
    }
}

const bookService = new BookService();
export default bookService;