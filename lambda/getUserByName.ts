import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

interface MyEvent {
    body: string;
}

export const handler = async (event: MyEvent): Promise<any> => {
    let obj = JSON.parse(event.body) as User;
    const user = await getUserByName(obj.name);
    const head = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    if (user) {
        if (obj.password === user.password) {
            return {
                headers: head,
                statusCode: 200,
                body: JSON.stringify(user)
            };
        } else {
            return { headers: head, statusCode: 404, body: '' };
        }
    } else {
        return { headers: head, statusCode: 404, body: '' };
    }
};

async function getUserByName(id: string): Promise<User | null> {
    const params = {
        TableName: 'users',
        Key: {
            'name': id
        }
    };
    return await docClient
        .get(params)
        .promise()
        .then((data) => {
            return data.Item as User;
        })
        .catch((err: any) => {
            return null;
        });
}

export class User {
    name = '';
    password = '';
    role?: string;
    constructor() {}
}
