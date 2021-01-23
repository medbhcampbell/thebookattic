import { Pool } from 'pg';
import dotenv from 'dotenv';
import readline from 'readline';

import logger from '../log';
import { Author } from './author';

dotenv.config();

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pool = new Pool();

class AuthorService {

    async getAllAuthors(): Promise<Author[] | null> {
        logger.debug('Backend: Attempting to retrieve all authors');
        const query = 'select * from authors;';
        const result = await pool.query(query);
        pool.end();
        if (result) {
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
        if (result) {
            logger.debug('Backend: Successfully retrieved author');
            logger.trace(result.rows[0]);
            return result.rows[0];
        } else {
            logger.error('Backend: Failed to retrieve author');
            return null;
        }
    }

    async addAuthor(userId: number, firstName: string, lastName: string, avgRating: number, bio: string, picture: string): Promise<boolean> {
        logger.debug('Backend: Attempting to add author to table');
        const query = 
        `insert into authors (userid, firstname, lastname, avgrating, bio, picture) 
        values (
            '${userId}', 
            '${firstName}', 
            '${lastName}', 
            '${avgRating}', 
            '${bio}', 
            '${picture}'
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

const updatedAuthor: Author = new Author(1, 111111, 'Jane', 'Aus', 4.4, 'English romance author for the nobility', 'url');

function menu() {
    console.log('Choose an option:\n1.getAllAuthors\n2.getAuthorbyId(1)\n3.addAuthor(111116, \'Mark\', \'Twain\', 4.3, \'Participated in Confederate militia\', \'url\'\n4.updateAuthor(updatedAuthor)\n5.removeAuthor(6)\n6.Quit');
    rl.question('', async (answer) => {
        switch(answer) {
            case '1':
                authorService.getAllAuthors();
                break;
            case '2':
                authorService.getAuthorById(1);
                break;
            case '3':
                authorService.addAuthor(111116, 'Mark', 'Twain', 4.3, 'Participated in Confederate militia', 'url');
                break;
            case '4':
                authorService.updateAuthor(updatedAuthor);
                break;
            case '5':
                authorService.removeAuthor(6);
                break;
            case '6':
                process.exit();
            default:
                menu();
        }
    });
}

menu();

