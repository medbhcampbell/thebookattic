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
    let author: Author = JSON.parse(event.body) as Author;
    const result = await updateAuthor(author);
    pool.end();
    if (result) {
        return {statusCode: 204};
    } else {
        return {statusCode: 404};
    }
}

async function updateAuthor(author: Author): Promise<boolean> {
    logger.debug('Backend: Attempting to update author');
    const query = 
        `update authors 
        set 
            userid = ${author.userId}, 
            firstname = '${author.firstName}', 
            lastname = '${author.lastName}', 
            avgrating = '${author.avgRating}', 
            bio = '${author.bio}', 
            picture = '${author.picture}' 
        where id = ${author.authorId};`
    const result = await pool.query(query);
    pool.end();
    if (result) {
        logger.debug('Backend: Successfully updated author');
        return true;
    } else {
        logger.error('Backend: Failed to update author');
        return false;
    }
}