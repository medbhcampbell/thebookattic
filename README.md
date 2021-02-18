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
1. Set up an AWS RDS instance, and ensure that you have the permissions to create and access an AWS DynamoDB database
2. `cd thebookattic/setup`
3. To populate demo book data, connect to your RDS PostgreSQL database instance and run the `createPostgreSQLTables.sql` script (we recommend DBeaver as a SQL IDE, but this is not essential).
4. To populate demo user data, run `createtable.ts`

#### Lambda
 

#### API Gateway

### Frontend:

1. `cd thebookattic`
2. `npm i`
3. `npm run start`
