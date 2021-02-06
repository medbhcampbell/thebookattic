import * as AWS from 'aws-sdk';
import userService from '../user/user.service';


// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
    TableName: 'users'
}


const usersSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};




ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(usersSchema, (error, datares) => {
            if (err) {
                // log the error
                console.log('Error', error);
            } else {
                // celebrate, I guess
                console.log('Table Created', datares);
                setTimeout(()=>{
                    populateUsersTable();
                }, 10000);
            }
        });
    }, 5000);
});

function populateUsersTable() {
    userService.addUser({name: 'jim', password: 'pass', role: 'admin'}).then(()=>{});
    userService.addUser({name: 'linda', password: 'pass', role: 'admin'}).then(()=>{});
    userService.addUser({name: 'newguy', password: 'pass', role: 'user'}).then(()=>{});
    userService.addUser({name: 'robert', password: 'pass', role: 'user'}).then(()=>{});
    userService.addUser({name: 'lilith', password: 'pass', role: 'user'}).then(()=>{});
    userService.addUser({name: 'ifleming', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'emma', password: 'pass', role: 'admin'}).then(()=>{});
    userService.addUser({name: 'jausten', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'ltolstoy', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'sking', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'rdahl', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'jverne', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'csagan', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'gmartin', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'jtolkien', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'achristie', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'mshelley', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'dadams', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'egaskell', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'wshakespeare', password: 'pass', role: 'author'}).then(()=>{});
    userService.addUser({name: 'epoe', password: 'pass', role: 'author'}).then(()=>{});    
}