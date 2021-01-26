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
    const result = await addAuthor(author);
    pool.end();
    if (result) {
        return {statusCode: 204};
    } else {
        return {statusCode: 400};
    }
}

async function addAuthor(author: Author): Promise<boolean> {
    logger.debug('Backend: Attempting to add author to table');
    const query = 
    `insert into authors (userid, firstname, lastname, avgrating, bio, picture) 
    values (
        '${author.userId}', 
        '${author.firstName}', 
        '${author.lastName}', 
        '${author.avgRating}', 
        '${author.bio}', 
        '${author.picture}'
    )`
    const result = await pool.query(query);
    if (result) {
        logger.debug('Backend: Successfully added author to table');
        return true;
    } else {
        logger.error('Backend: Failed to add author to table');
        return false;
    }
}