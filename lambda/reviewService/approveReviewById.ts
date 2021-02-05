// Admin can approve a Review 

import { Client } from 'pg';


interface MyEvent {
    path: string;
}



export const handler = async (event: MyEvent): Promise<any> => {
    const client = new Client();
    await client.connect();
    let reviewid= Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    let q = 'update reviews set approved = true where id=$1::integer';
    let res = await client.query(q, [reviewid]);

    // Get the id of the book this review was for
    q = `select bookid from reviews where id=$1::int`
    let bookQuery = await client.query(q, [reviewid]).catch((err: any) => console.error(err));
    let bookid = bookQuery.rows[0].bookid;

    // Calculate and update author rating
    q = `update authors set avgrating = 
            (select avg(r.rating) from reviews r inner join books b on (r.bookid = b.id) where b.authorid=
                (select authorid from books where id=$1::int))
        where id = 
            (select authorid from books where id=$2::int);`;
    await client.query(q, [bookid,bookid]).catch((err: any) => console.error(err));

    // Calculate and update book rating
    q = `update books set rating = (select avg(rating) from reviews where bookid=$1::int) where id=$2::int;`;
    await client.query(q, [bookid,bookid]).catch((err: any) => console.error(err));
    
    await client.end();
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    if (res) {
        return { headers: head,
            body: JSON.stringify(res),          
            statusCode: 204 };

    } else {
        return { headers: head,
            body: JSON.stringify({}),
            statusCode: 400 };
    }
};
