import { Pool } from 'pg';
import dotenv from 'dotenv';

import logger from '../log';

dotenv.config();

const pool = new Pool();

interface AuthorEvent {
    path: string
}

export const handler = async (event: AuthorEvent): Promise<any> => {
    let authorId = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    const author = await removeAuthor(authorId);
    pool.end();
    if (author) {
        return {statusCode: 200, body: JSON.stringify(author)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function removeAuthor(authorId: number): Promise<boolean> {
    logger.debug('Backend: Attempting to remove author from table');
    const query = 
        `delete from authors
        where id = ${authorId}`;
    const result = await pool.query(query);
    pool.end();
    if (result) {
        logger.debug('Backend: Successfully removed author from table');
        return true;
    } else {
        logger.error('Backend: Failed to remove author from table');
        return false;
    }
}
}