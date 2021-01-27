import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

interface MyEvent {
    path: string;
}

export const handler = async (event: MyEvent): Promise<any> => {
    let userName = event.path.substring(event.path.lastIndexOf('/')+1, event.path.length);
    const user = await getUserByName(userName);
    if (user) {
        return {statusCode: 200, body: JSON.stringify(user)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}

async function getUserByName(id: string): Promise<User | null> {
    const params = {
        TableName: 'users',
        Key: {
            'name': id
        }
    }
    return await docClient.get(params).promise().then((data) => {
        return data.Item as User;
    }).catch((err: any) => {
        return null;
    });
}


export class User {
    name = '';
    password = '';
    role?: string;
    constructor(){}
    
}