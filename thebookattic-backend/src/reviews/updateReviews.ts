import { Client } from 'pg';

interface MyEvent {
    body: string;
}

export const handler = async (event: MyEvent) => {
    const client = new Client();
    await client.connect();
    let review: Review = JSON.parse(event.body) as Review;
    const q = `update reviews set approved = true 
    where id = $1::int`;
    let res = await client.query(q, [
        review.id
    ]);
    await client.end();
    if (res) {
        return { statusCode: 204 };
    } else {
        return { statusCode: 400 };
    }
};

class Review {
    id: number = 0;
    rating: number = 0;
    content: string = '';
    username: string = '';
    bookid: number = 0;
    approved: boolean = false;
}
