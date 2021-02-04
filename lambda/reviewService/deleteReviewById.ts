// Admins can delete reviews

import { Client } from 'pg';


interface MyEvent {
    path: string;
}



export const handler = async (event: MyEvent): Promise<any> => {
    const client = new Client();
    await client.connect();
    let reviewid= Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    const q = 'delete from reviews where id=$1::integer';
    let res = await client.query(q, [reviewid]);
    await client.end();
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    if (res) {
        return { headers: head,
            body: JSON.stringify(res),          
            statusCode: 204 };

    } else {
        return { headers: head,
            body: JSON.stringify({}),
            statusCode: 400 };
    }
};


