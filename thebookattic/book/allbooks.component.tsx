import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeBooks } from "../store/actions";
import { BookState } from "../store/store";
import { Book } from "./book";
import bookService from "./book.service";
import BookListComponent from "./booklist.component";

export default function AllBooksComponent() {
    const dispatch = useDispatch();

    const books = useSelector((state: BookState) => state.books);
    // Have the books been retrieved?
    const [retrievedBooks, setRetrievedBooks] = useState(false);
    const [approved, setApproved] = useState([] as Book[]);

    useEffect(()=>{
        // Use this to make sure we're not setting state after unmount
        let isMounted = true;

        if(books.length <= 0) {
            // If there's no books in the store, use the service to retrieve them
            bookService.getAllBooks().then((result)=>{
                dispatch(changeBooks(result));
                if(isMounted) {
                    setApproved(result.filter(item=>{return item.approved}));
                    setRetrievedBooks(true);
                }
            });
        } else {
            setApproved(books.filter(item=>{return item.approved}));
            setRetrievedBooks(true);
        }
        // The cleanup callback (called on unmount)
        return () => { isMounted = false };
    }, []);

    return (
        <BookListComponent books={approved} retrievedBooks={retrievedBooks}/>
    );
}