import { Client } from 'pg';

export const handler = async () => {
    const client = new Client();
    await client.connect();
    const res = await client.query(`select * from reviews`);
    await client.end();
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    let response;
    if(res){
        response = {
            headers : head,
            statusCode: 200,
            body: JSON.stringify(res.rows) 
        };
    } else{
        response = {
            headers : head,
            statusCode: 404,
            body: ''
        };

    }
    return response;
};
