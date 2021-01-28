import { Client } from 'pg';

interface MyEvent {
    body: string;
}

export const handler = async (event: MyEvent) => {
    const client = new Client();
    await client.connect();
    let review = JSON.parse(event.body);
    const q = `update reviews set approved = true 
    where id = $1::int`;
    let res = await client.query(q, [review]);
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
