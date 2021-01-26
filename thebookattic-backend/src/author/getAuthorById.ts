import { Pool } from 'pg';
import dotenv from 'dotenv';

import logger from '../log';
import { Author } from './author';

dotenv.config();

const pool = new Pool();

interface AuthorEvent {
    path: string
}

export const handler = async (event: AuthorEvent): Promise<any> => {
    let authorId = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    const author = await getAuthorById(authorId);
    pool.end();
    if (author) {
        return {statusCode: 200, body: JSON.stringify(author)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function getAuthorById(authorId: number): Promise<Author | null> {
    logger.debug('Backend: Attempting to retrieve one author by their ID');
    const query = `select * from authors where id = '${authorId}'`;
    const result = await pool.query(query);
    if (result.rowCount === 1) {
        logger.debug('Backend: Successfully retrieved author');
        logger.trace(result.rows[0]);
        return result.rows[0];
    } else {
        logger.error('Backend: Failed to retrieve author');
        return null;
    }
}