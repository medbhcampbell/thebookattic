import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeBooks } from "../store/actions";
import { BookState } from "../store/store";
import bookService from "./book.service";
import BookListComponent from "./booklist.component";

export default function AllBooksComponent() {
    const dispatch = useDispatch();

    const books = useSelector((state: BookState) => state.books);
    // Have the books been retrieved?
    const [retrievedBooks, setRetrievedBooks] = useState(false);
    
    useEffect(()=>{
        if(books.length <= 0) {
            // If there's no books in the store, use the service to retrieve them
            bookService.getAllBooks().then((result)=>{
                dispatch(changeBooks(result));
                setRetrievedBooks(true);
            });
        } else {
            setRetrievedBooks(true);
        }
    }, []);

    return (
        <BookListComponent books={books} retrievedBooks={retrievedBooks}/>
    );
}