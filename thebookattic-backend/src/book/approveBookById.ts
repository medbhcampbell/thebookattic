// Admins can approve books

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool();

interface BookEvent {
    path: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    let bookid = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    console.log(`approving book ${bookid}`);

    const approved = await approveBookById(bookid);
    if(approved) {
        return {statusCode: 200, body: JSON.stringify({})};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function approveBookById(bookid: number): Promise<boolean> {
    return pool.query('update thebookattic.books set approved = true where id=$1::integer', [ bookid ]).then((res) => {
        return true;
    }).catch((err) => {
        console.log(err);
        return false;
    });
}