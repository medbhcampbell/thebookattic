import { Client } from 'pg';
import dotenv from 'dotenv';

import logger from '../log';
import { Author } from './author';

dotenv.config();

const client = new Client();

class AuthorService {

    async getAllAuthors(): Promise<Author[] | null> {
        logger.debug('Backend: Attempting to retrieve all authors');
        const query = 'select * from authors;';
        let result: any;
        client.connect();
        try {
            result = await client.query(query);
            logger.debug('Backend: Succesfully retrieved author list');
            logger.trace(result.rows);
            return result.rows;
        } catch (error) {
            logger.error('Backend: Failed to retrieve author list: ' + error);
            return null;
        } finally {
            client.end();
        }
    }

    async getAuthorById(authorId: number): Promise<Author | null> {
        logger.debug('Backend: Attempting to retrieve one author by their ID');
        const query = `select * from authors where id = '${authorId}'`;
        let result: any;
        client.connect();
        try {
            result = await client.query(query)
            logger.debug('Backend: Successfully retrieved author');
            logger.trace(result.rows[0]);
            return result.rows[0];
        } catch (error) {
            logger.error('Backend: Failed to retrieve author: ' + error);
            return null;
        } finally {
            client.end();
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
        client.connect();
        try {
            await client.query(query);
            logger.debug('Successfully added author to table');
            return true;
        } catch (error) {
            logger.error('Backend: Failed to add author to table: ' + error);
            return false;
        } finally {
            client.end();
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
        client.connect();
        try {
            await client.query(query);
            logger.debug('Successfully updated author');
            return true;
        } catch (error) {
            logger.error('Backend: Failed to update author: ' + error);
            return false;
        } finally {
            client.end();
        }
    }

    async removeAuthor(authorId: number): Promise<boolean> {
        logger.debug('Backend: Attempting to remove author from table');
        const query = 
            `delete from authors
            where id = ${authorId}`;
        client.connect();
        try {
            await client.query(query);
            logger.debug('Backend: Successfully removed author from table');
            return true;
        } catch (error) {
            logger.error('Backend: Failed to remove author from table: ' + error);
            return false;
        } finally {
            client.end();            
        }
    }
}

const authorService = new AuthorService();
export default authorService;

//console.log(authorService.getAllAuthors());
//console.log(authorService.getAuthorById(1));