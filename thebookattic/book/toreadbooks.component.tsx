import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeBooks } from "../store/actions";
import { UserState } from "../store/store";
import { Book } from "./book";
import bookService from "./book.service";
import BookListComponent from "./booklist.component";

export default function ToReadBooksComponent() {
    
    const [retrievedBooks, setRetrievedBooks] = useState(false);
    const user = useSelector((state: UserState) => state.user);
    let books: Book[] = [];

    useEffect(() => {
        //get the user's list of books to read
        bookService.getBooksToRead(user.name).then((result) => {
            books = result;
            setRetrievedBooks(true);
        });
    }, []);

    return (
        <BookListComponent books={books} retrievedBooks={retrievedBooks} />
    );
}