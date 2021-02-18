# The Book Attic

## Project Description

The Book Attic is a full-stack hybrid application for web and mobile which allows readers, authors, and admins to interact with a list of books. Readers can view books, add them to lists, review them and view recommendations based on those reviews. Authors can additionally submit new books and delete their own work, and admins can moderate reviews and books that have been submitted.

## Technologies Used

## Features

## Getting Started

`git clone https://github.com/medbhcampbell/thebookattic.git`

### Backend:

#### Databases

If you want to use demo data:
1. Set up an AWS RDS instance, and ensure that you have the permissions to create and access an AWS DynamoDB database.
2. `cd thebookattic/setup`
3. `npx tsc createtable.ts`
4. To populate demo book data, connect to your RDS PostgreSQL database instance and run the `createPostgreSQLTables.sql` script (we recommend adding your local IP to the inbound rules in the RDS instance's security group, installing DBeaver as a SQL IDE and connecting to your database, and running the script through it).
5. To populate demo user data, run `node createtable.js`

#### Lambda

Each Lambda function has a separate TypeScript file which needs to be transpiled to JavaScript, and the JavaScript must be uploaded to each Lambda function.

1. `cd lambda`
2. `npx tsc`
3. Create Lambda layers from the zip files `bookServiceLayer/nodejs.zip`, `genreServiceLayer/nodejs.zip`, and `nodePostgres/nodejs.zip`. Make sure Node.js 12.x is selected as a runtime. These three layers will be referred to as `bookservicelayer`, `genreservicelayer`, and `nodepostgreslayer` respectively.
4. Make an IAM role with the AWSLambdaBasicExecutionRole and AWSLambdaVPCAccessExecutionRole. This role will be referred to as LambdaVPCRole.
5. Make an IAM role with the AWSLambdaDynamoDBExecutionRole. This role will be referred to as LambdaDynamoRole.
6. For each JavaScript file in `lambda/authorService`, create a Lambda function.
 a. Copy the JavaScript code into the index.js file provided.
 b. Add the nodepostgres layer.
 c. Add PGDATABASE, PGHOST, PGPASSWORD, PGPORT and PGUSER to the environment variables. Set these values to match your RDS database (PGHOST is the database instance endpoint).
 d. Add the LambdaVPCRole role to your Lambda function.
 e. Assign your RDS instance's VPC and security group to the Lambda function
5. Repeat step 4 for each JavaScript file in `lambda/bookService`, but include both the `nodepostgreslayer` and the `bookservicelayer`.
6. Repeat step 4 for each JavaScript file in `lambda/genreService`, but include both the `nodepostgreslayer` and the `genreservicelayer`.
7. Repeat step 4 for each JavaScript file in `lambda/reviewService`
8. Repeat step 4 for each JavaScript file in `lambda/userService`, but use the LambdaDynamoRole for your lambda functions instead of the LambdaVPC role.

#### API Gateway

### Frontend:

1. `cd thebookattic`
2. `npm i`
3. `npm run start`
