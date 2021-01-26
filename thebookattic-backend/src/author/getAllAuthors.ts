import { Pool } from 'pg';
import dotenv from 'dotenv';

import logger from '../log';
import { Author } from './author';

dotenv.config();

const pool = new Pool();

interface AuthorEvent {
    body: string
}

export const handler = async (event: AuthorEvent): Promise<any> => {
    let authors = await getAllAuthors();
    pool.end();
    if (authors) {
        return {statusCode: 200, body: JSON.stringify(authors)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function getAllAuthors(): Promise<Author[] | null> {
    logger.debug('Backend: Attempting to retrieve all authors');
    const query = 'select * from authors;';
    const result = await pool.query(query);
    if (result.rowCount) {
        logger.debug('Backend: Succesfully retrieved author list');
        logger.trace(result.rows);
        return result.rows;
    } else {
        logger.error('Backend: Failed to retrieve author list');
        return null;
    }
}