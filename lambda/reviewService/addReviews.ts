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
    const q = `insert into reviews (rating, content, username, bookid)
    values ($1::int, $2::text, $3::text, $4::int);`;
    let res = await client.query(q, [
        review.rating,
        review.content,
        review.username,
        review.bookid
    ]);
    // TODO: Calculate and update author rating
    // TODO: Calculate and update book rating
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
