import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';
import { Book } from './book';

class BookService {
    private pool: Pool;

    constructor() {
        dotenv.config();
        this.pool = new Pool();
    }

    // function getAllBooks(): Book[] {
    //     const res = await this.pool.query('select * from books');
    //     res.rows.array.map(book => {
    //         return new Book(book.)
    //     });
    // }
}

const bookService = new BookService();
export default bookService;