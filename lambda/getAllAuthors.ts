import {Pool, Client } from 'pg';

export const handler = async()=> {
    const client = new Client();
    await client.connect();
    const res = await client.query('select * from authors');
    await client.end();
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    let response;
    if(res){
        response = {
            header : head,
            statuscode: 200,
            body: JSON.stringify({authors: res.rows}) 
        };
    } else{
        response = {
            header : head,
            statuscode: 400,
            body: ''
        };

    }
    return response;
};

