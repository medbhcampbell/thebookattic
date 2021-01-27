// All users can see a list of all approved books

import { Pool } from 'pg';

const pool = new Pool();

export const handler = async (): Promise<any> => {
    const books = await getApprovedBooks();
    pool.end();
    if(books) {
        console.log(JSON.stringify(books));
        return {statusCode: 200, body: JSON.stringify(books), headers: {'Access-Control-Allow-Origin': '*'}};
    } else {
        return {statusCode: 404, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    }
}

async function getApprovedBooks(): Promise<Book[] | null> {
    return pool.query('select * from thebookattic.books where approved=true').then((res) => {
        return res.rows as Book[];
    }).catch((err) => {
        console.log(err);
        return null;
    });
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