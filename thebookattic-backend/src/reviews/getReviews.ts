import { Client } from 'pg';

export const handler = async () => {
    const client = new Client();
    await client.connect();
    const res = await client.query(`select * from reviews`);
    await client.end();
    const response = {
        statusCode: 200,
        body: {
            reviews: res.rows
        }
    };
    return response;
};
