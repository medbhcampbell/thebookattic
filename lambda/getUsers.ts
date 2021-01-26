import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

export const handler = async () => {
    const user = await getUsers();
    if (user) {
        return {statusCode: 200, body: JSON.stringify(user)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}



async function getUsers(): Promise<User[]  | null> {
    const params = {
        TableName: 'users'
    };
    return await docClient.scan(params).promise().then((data:any) => {
        return data.Items as User[];
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