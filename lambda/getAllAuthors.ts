import { Client } from 'pg';

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
            headers : head,
            statuscode: 200,
            body: JSON.stringify(res) 
        };
    } else{
        response = {
            headers : head,
            statuscode: 400,
            body: ''
        };

    }
    return response;
};

