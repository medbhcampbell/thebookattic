// Lambda BookService layer
import { Client } from 'pg';

class BookService {

    async getBooks(): Promise<Book[] | null> {
        const client = new Client();
        await client.connect();

        let res;
        try {
            res = await client.query('select * from books');
            client.end();
            return res.rows as Book[];
        } catch (err) {
            client.end();
            console.log(err);
            return null;
        }
    }

    async getBooksFromJoinTable(username: string, joinTable: string): Promise<Book[] | null> {
        const client = new Client();
        await client.connect();

        let res;
        const q = `select b.authorid, b.title, b.cover, b.blurb, b.page_count, b.approved, b.genreid from books b join ${joinTable} t on b.id = t.bookid where t.username=$1::text`;
        const args = [username];
        try {
            res = await client.query(q, args);
            client.end();
            return res.rows as Book[];
        } catch (err) {
            client.end();
            console.log(err);
            return null;
        }
    }

    async getBookById(bookid: number): Promise<Book | null> {
        const client = new Client();
        await client.connect();

        let res;
        try {
            res = await client.query('select * from books where id=$1::integer', [bookid]);
            client.end();
            return res.rows[0] as Book;
        } catch (err) {
            client.end();
            console.log(err);
            return null;
        }
    }

    async addBook(book: Book): Promise<boolean> {
        const client = new Client();
        await client.connect();

        try {
            const q = 'insert into books (authorid, title, cover, blurb, page_count, link, genreid) values($1::integer, $2::text, $3::text, $4::text, $5::integer, $6::text, $7::integer)';
            const args = [book.authorid, book.title, book.cover, book.blurb, book.page_count, book.link, book.genreid];
            console.log(`query" ${q}`);
            console.log(`args: ${JSON.stringify(args)}`);
            await client.query(q, args);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async deleteBookById(bookid: number): Promise<boolean> {
        const client = new Client();
        await client.connect();

        try {
            await client.query('delete from books where id=$1::integer', [bookid]);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async approveBookById(bookid: number): Promise<number> {
        const client = new Client();
        await client.connect();

        try {
            const ret = await client.query('update books set approved = true where id=$1::integer', [bookid]);
            // ret.rows is the number of rows updated. should be 1. if we can't find the book (0), that's a problem
            return ret.rows;
        } catch(err) {
            console.log(err);
            return 0;
        }
    }
}

class Book {

    //ID from SQL
    public id: number = 0;

    //book's status on our site
    public rating: number = 0;
    public approved: boolean = false;

    constructor(
        //IDs from SQL
        public authorid: number,
        //Info about book
        public title: string,
        public cover: string,
        public blurb: string,
        public page_count: number,
        public link: string,
        public genreid: number
    ){}   
}

export default BookService;