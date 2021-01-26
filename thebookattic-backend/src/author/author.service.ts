import { Pool } from 'pg';
import dotenv from 'dotenv';

import logger from '../log';
import { Author } from './author';

dotenv.config();

const pool = new Pool();

class AuthorService {

    async getAllAuthors(): Promise<Author[] | null> {
        logger.debug('Backend: Attempting to retrieve all authors');
        const query = 'select * from authors;';
        const result = await pool.query(query);
        pool.end();
        if (result.rowCount) {
            logger.debug('Backend: Succesfully retrieved author list');
            logger.trace(result.rows);
            return result.rows;
        } else {
            logger.error('Backend: Failed to retrieve author list');
            return null;
        }
    }

    async getAuthorById(authorId: number): Promise<Author | null> {
        logger.debug('Backend: Attempting to retrieve one author by their ID');
        const query = `select * from authors where id = '${authorId}'`;
        const result = await pool.query(query);
        pool.end();
        if (result.rowCount === 1) {
            logger.debug('Backend: Successfully retrieved author');
            logger.trace(result.rows[0]);
            return result.rows[0];
        } else {
            logger.error('Backend: Failed to retrieve author');
            return null;
        }
    }

    async addAuthor(author: Author): Promise<boolean> {
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
        pool.end();
        if (result) {
            logger.debug('Successfully added author to table');
            return true;
        } else {
            logger.error('Backend: Failed to add author to table');
            return false;
        }
    }

    async updateAuthor(author: Author): Promise<boolean> {
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
            logger.debug('Successfully updated author');
            return true;
        } else {
            logger.error('Backend: Failed to update author');
            return false;
        }
    }

    async removeAuthor(authorId: number): Promise<boolean> {
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

const authorService = new AuthorService();
export default authorService;