interface MyEvent {
    body: string;
}

class Review {
    id: number = 0;
    rating: number = 0;
    content: string = '';
    username: string = '';
    bookid: number = 0;
    approved: boolean = false;
}

export const handler = async (event: MyEvent) => {
    const { Client } = require('pg');
    const client = new Client();
    await client.connect();
    let review: Review = JSON.parse(event.body) as Review;
    const q = `update reviews set approved = true 
    where id = $1::int`;
    let res = await client.query(q, [review.id]);
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
