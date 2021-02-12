import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
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

    useFocusEffect(React.useCallback(()=>{
        console.log('allbooks useEffect triggered');
        if(books.length <= 0) {
            // If there's no books in the store, use the service to retrieve them
            bookService.getAllBooks().then((result)=>{
                setApproved(result.filter(item=>{return item.approved}));
                dispatch(changeBooks(result));
                setRetrievedBooks(true);
            });
        } else {
            setApproved(books.filter(item=>{return item.approved}));
            setRetrievedBooks(true);
        }
    }, [books]));

    return (
        <BookListComponent books={approved} retrievedBooks={retrievedBooks}/>
    );
}