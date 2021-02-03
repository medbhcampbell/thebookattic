import { Client } from 'pg';

interface MyEvent {
    body: string;
}

class Review {
    rating: number = 0;
    content: string = '';
    username: string = '';
    bookid: number = 0;
    approved: boolean = false;
}

export const handler = async (event: MyEvent) => {
    const client = new Client();
    await client.connect();
    let review: Review = JSON.parse(event.body) as Review;
    // Add the review
    let q = `insert into reviews (rating, content, username, bookid)
    values ($1::int, $2::text, $3::text, $4::int);`;
    let res = await client.query(q, [
        review.rating,
        review.content,
        review.username,
        review.bookid
    ]);
    
    // Calculate and update author rating
    q = `update authors set avgrating = 
            (select avg(r.rating) from reviews r inner join books b on (r.bookid = b.id) where b.authorid=
                (select authorid from books where id=$1::int))
        where id = 
            (select authorid from books where id=$2::int);`;
    await client.query(q, [
        review.bookid,
        review.bookid
    ]).catch((err: any) => console.error(err));

    // Calculate and update book rating
    q = `update books set rating = (select avg(rating) from reviews where bookid=$1::int) where id=$2::int;`;
    await client.query(q, [
        review.bookid,
        review.bookid
    ]).catch((err: any) => console.error(err));

    await client.end();
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    if (res) {
        return { headers: head, statusCode: 204 };
    } else {
        return { headers: head, statusCode: 400 };
    }
};
