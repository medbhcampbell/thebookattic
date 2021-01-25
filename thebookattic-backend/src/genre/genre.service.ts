import dotenv from 'dotenv';
import { Pool } from 'pg';

import logger from '../log';
import Genre from './genre';

dotenv.config();
const pool = new Pool();

class GenreService {

    async getGenres(): Promise<Genre[] | null> {
        logger.debug('Backend: Retreiving genre list');
        const query = 'select * from genres;';
        const result = await pool.query(query);
        pool.end();
        if (result.rowCount) {
            logger.debug('Backend: Succesfully retrieved genre list');
            logger.trace(result.rows);
            return result.rows;
        } else {
            logger.error('Backend: Failed to retrieve genre list');
            return null;
        }
    }

    async getGenreById(id: number): Promise<Genre | null> {
        logger.debug(`Backend: Retreiving genre by id: ${id}`);
        const query = `select * from genres where id = '${id}'`;
        const result = await pool.query(query);
        pool.end();
        if (result.rowCount === 1) {
            logger.debug('Backend: Successfully retrieved genre');
            logger.trace(result.rows[0]);
            return result.rows[0];
        } else {
            logger.error('Backend: Failed to retrieve genre');
            return null;
        }
    }

    async addGenre(name: string): Promise<boolean> {
        logger.debug(`Backend: Adding genre "${name}" to table`);
        const query =  `insert into genres (name) values ('${name}')`
        const result = await pool.query(query);
        pool.end();
        if (result) {
            logger.debug('Backend: Successfully added genre to table');
            return true;
        } else {
            logger.error('Backend: Failed to add genre to table');
            return false;
        }
    }

    async removeGenre(id: number): Promise<boolean> {
        logger.debug(`Backend: Removing genre by id: ${id}`);
        const query = `delete from genres where id = ${id}`;
        const result = await pool.query(query);
        pool.end();
        if (result) {
            logger.debug('Backend: Successfully removed genre from table');
            return true;
        } else {
            logger.error('Backend: Failed to remove genre from table');
            return false;
        }
    }
}

const genreService = new GenreService();
export default genreService;