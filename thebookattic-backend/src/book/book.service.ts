import { Pool } from 'pg';
import dotenv from 'dotenv';

//class to get lists of books and information about them
class BookService {
    private pool: Pool;

    constructor() {
        dotenv.config();
        this.pool = new Pool();
    }

    //get all the books in the database
    getAllBooks(): void {
        this.pool.query('select * from books').then((res) => {
            console.log(res.rows);
            this.pool.end();
            process.exit();
        }).catch(err => {
            console.log(err);
        });
    }
}

const bookService = new BookService();
export default bookService;

//testing
bookService.getAllBooks();