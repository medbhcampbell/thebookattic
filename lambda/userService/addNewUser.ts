import * as AWS from "aws-sdk";

let docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-west-2",
  endpoint: "http://dynamodb.us-west-2.amazonaws.com",
});

interface MyEvent {
  body: string;
}

export const handler = async (event: MyEvent): Promise<any> => {
  let user: User = JSON.parse(event.body) as User;
  let resp = await addUser(user);
  const head = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};   
  if (resp) {
    return { headers:head,statusCode: 204 };
  } else {
    return { headers:head,statusCode: 400 };
  }
};



async function addUser(user: User): Promise<boolean> {
  const params = {
    TableName: "users",

    Item: user,
    ConditionExpression: "#name <> :name",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": user.name,
    },
  };

  return await docClient
    .put(params)
    .promise()
    .then((result) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}

export class User {
  name = "";
  password = "";
  role?: string;
  constructor() {}
}
