// Lambda BookService layer
import { Client } from 'pg';

class BookService {

    async getBooks(): Promise<Book[] | null> {
        const client = new Client();
        await client.connect();

        let res;
        try {
            res = await client.query('select * from thebookattic.books');
            client.end();
            return res.rows as Book[];
        } catch (err) {
            client.end();
            console.log(err);
            return null;
        };
    }

    async getBookById(bookid: number): Promise<Book | null> {
        const client = new Client();
        await client.connect();

        let res;
        try {
            res = await client.query('select * from thebookattic.books where id=$1::integer', [bookid]);
            client.end();
            return res.rows[0] as Book;
        } catch (err) {
            client.end();
            console.log(err);
            return null;
        };
    }

    async addBook(book: Book): Promise<boolean> {
        const client = new Client();
        await client.connect();

        try {
            const q = 'insert into thebookattic.books (authorid, title, cover, blurb, page_count, link, genreid) values($1::integer, $2::text, $3::text, $4::text, $5::integer, $6::text, $7::integer)';
            const args = [book.authorId, book.title, book.cover, book.blurb, book.pageCount, book.link, book.genre];
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
            await client.query('delete from thebookattic.books where id=$1::integer', [bookid]);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async approveBookById(bookid: number): Promise<boolean> {
        const client = new Client();
        await client.connect();

        try {
            await client.query('update thebookattic.books set approved = true where id=$1::integer', [bookid]);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }
}

class Book {

    //ID from SQL
    public id: number = 0;

    //book's status on our site
    public rating: number = 0;
    public isApproved: boolean = false;

    constructor(
        //IDs from SQL
        public authorId: number,
        //Info about book
        public title: string,
        public cover: string,
        public blurb: string,
        public pageCount: number,
        public link: string,
        public genre: number
    ){}   
}

export default BookService;