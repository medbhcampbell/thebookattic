// Admins can delete reviews

import { Client } from 'pg';


interface MyEvent {
    path: string;
}



export const handler = async (event: MyEvent): Promise<any> => {
    const client = new Client();
    await client.connect();
    let reviewid= Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    // Get the id of the book this review was for
    let q = `select bookid from reviews where id=$1::integer`
    let bookQuery = await client.query(q, [reviewid]).catch((err: any) => console.error(err));
    let bookid = bookQuery.rows[0].bookid;
    
    // Delete the review
    q = 'delete from reviews where id=$1::integer';
    let res = await client.query(q, [reviewid]);

    // Check if that was the last review
    q = 'select * from reviews where bookid=$1::integer';
    let reviewsLeftQuery = await client.query(q, [bookid]);

    if(reviewsLeftQuery.rows.length > 0) {
        // Calculate and update author rating
        q = `update authors set avgrating = 
                (select avg(r.rating) from reviews r inner join books b on (r.bookid = b.id) where b.authorid=
                    (select authorid from books where id=$1::integer))
            where id = 
                (select authorid from books where id=$2::integer);`;
        await client.query(q, [bookid,bookid]).catch((err: any) => console.error(err));

        // Calculate and update book rating
        q = `update books set rating = (select avg(rating) from reviews where bookid=$1::integer) where id=$2::integer;`;
        await client.query(q, [bookid,bookid]).catch((err: any) => console.error(err));
    }
    else {
        // If this was the last review, set the average ratings to 0. Otherwise avg() would set them to null
        q = `update authors set avgrating=0 where id=(select authorid from books where id=$1::integer);`;
        await client.query(q, [bookid]).catch((err: any) => console.error(err));

        q = `update books set rating=0 where id=$1::integer;`;
        await client.query(q, [bookid]).catch((err: any) => console.error(err));
    }

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


