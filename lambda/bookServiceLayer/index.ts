// Lambda BookService layer
import { Client } from 'pg';

class BookService {

    async getApprovedBooks(): Promise<Book[] | null> {
        const client = new Client();
        await client.connect();

        let res;
        try {
            res = await client.query('select * from thebookattic.books where approved=true');
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