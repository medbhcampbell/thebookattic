import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.PGHOST);

const pool = new Pool();

  //get all the APPROVED books in the database (as a user)
function getAllBooks() {
  pool.query('select * from thebookattic.books where approved=true').then((res) => {
      console.log(res.rows);
    })
    .catch((err) => {
      console.log(err);
    });
}

  //get APPROVED books by author (as a user)
function getBooksByAuthor(): void {

}

  //get APPROVED books by genre(s)
  //get book by id
  //add a book to the database (as an author)
  //delete a book from the database (as an author/admin)
  //get UNAPPROVED books (as an admin)
  //approve a book (as an admin)

function quit() {
    pool.end();
}

//testing
getAllBooks();


quit();
