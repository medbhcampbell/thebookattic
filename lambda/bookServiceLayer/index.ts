// Lambda BookService layer
import { Client } from 'pg';

class BookService {

    async getBooks(): Promise<Book[] | null> {
        const client = new Client();
        await client.connect();

        let res;
        try {
            res = await client.query('select b.id, b.authorid, b.title, b.cover, b.blurb, b.page_count, b.approved, b.genreid, b.link from books b');
            return res.rows as Book[];
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            client.end();
        }
    }

    async getBooksFromJoinTable(username: string, joinTable: string): Promise<Book[] | null> {
        const client = new Client();
        await client.connect();

        let res;
        const q_toread = `select b.id, b.authorid, b.title, b.cover, b.blurb, b.page_count, b.approved, b.link, b.genreid from books b join toread t on b.id = t.bookid where t.username=$1::text`;
        const q_haveread = `select b.id, b.authorid, b.title, b.cover, b.blurb, b.page_count, b.approved, b.link, b.genreid from books b join haveread t on b.id = t.bookid where t.username=$1::text`;
        let q;
        if(joinTable === 'toread') {
            q = q_toread;
        } else if(joinTable === 'haveread') {
            q = q_haveread;
        }
        const args = [username];
        try {
            res = await client.query(q, args);
            return res.rows as Book[];
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            client.end();
        }
    }

    async getBookById(bookid: number): Promise<Book | null> {
        const client = new Client();
        await client.connect();

        let res;
        try {
            res = await client.query('select b.id, b.authorid, b.title, b.cover, b.blurb, b.page_count, b.approved, b.genreid, b.link from books b where id=$1::integer', [bookid]);
            return res.rows[0] as Book;
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            client.end();
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
        } finally {
            client.end();
        }
    }

    async addBookToJoinTable(username: string, bookid: number, joinTable: string): Promise<boolean> {
        const client = new Client();
        await client.connect();

        const q_toread = `insert into toread (username, bookid) values ($1::text, $2::integer)`;
        const q_haveread = `insert into haveread (username, bookid) values ($1::text, $2::integer)`;
        let q;
        if(joinTable === 'toread') {
            q = q_toread;
        } else if(joinTable === 'haveread') {
            q = q_haveread;
        }

        const args = [username, bookid];

        try {
            await client.query(q, args);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        } finally {
            client.end();
        }
    }

    async deleteBookFromJoinTable(username: string, bookid: number, joinTable: string): Promise<boolean> {
        const client = new Client();
        await client.connect();

        const q_toread = `delete from toread where username=$1::text and bookid=$2::integer`;
        const q_haveread = `delete from haveread where username=$1::text and bookid=$2::integer`;
        let q;
        if(joinTable === 'toread') {
            q = q_toread;
        } else if(joinTable === 'haveread') {
            q = q_haveread;
        }
    
        const args = [username, bookid];

        try {
            await client.query(q, args);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        } finally {
            client.end();
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
        } finally {
            client.end();
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
        } finally {
            client.end();
        }
    }
    
    async getBookRating(bookid: number): Promise<number | null> {
        const client = new Client();
        await client.connect();

        let res;
        try {
            res = await client.query('select avg(rating) from reviews where bookid=$1::integer and approved=true', [bookid]);
            client.end();
            return Number(res.rows[0].avg);
        } catch (err) {
            client.end();
            console.log(err);
            return null;
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