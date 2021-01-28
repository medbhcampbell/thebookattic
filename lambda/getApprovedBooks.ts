// All users can see a list of all approved books


import { Client } from 'pg';

export const handler = async () => {
    const client = new Client();
    await client.connect();
    const books = await client.query('select * from books where approved=true');
    await client.end();
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    let response;
    if(books){
        response = {
            headers : head,
            statusCode: 200,
            body: JSON.stringify(books.rows) 
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


