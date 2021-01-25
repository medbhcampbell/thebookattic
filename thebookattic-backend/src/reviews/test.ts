import { Pool } from 'pg';
// We shouldn't use Client because it creates a connection not in the pool.
// We'll probably have to use client in AWS Lambda, though.
import dotenv from 'dotenv';
import { Review } from './review';

//project plan:
//each book page will have a state storing that exact book
//will add the review using input rating, input content,
//user state username, and book state id.

dotenv.config();

// Creating a connection pool of pg Clients
// new Pool() will retrieve environment variables
const pool = new Pool();

function displayReviews() {
    const q = `select * from reviews`;
    pool.query(q).then((res) => {
        console.log(res.rows);
        pool.end();
    });
}

function addReview(review: Review) {
    pool.query(
        `insert into reviews (rating, content, username, bookid)
        values ($1::int, $2::text, $3::text, $4::int);`,
        [review.rating, review.content, review.username, review.bookid]
    ).then((res) => {
        pool.end();
    });
}

//uncomment this to test display review
// displayReviews();

let review = new Review();
review.content = 'very very interesting book!';
review.rating = 5;
review.username = 'emma';
review.bookid = 1;

//uncomment this to add a review
// addReview(review);
