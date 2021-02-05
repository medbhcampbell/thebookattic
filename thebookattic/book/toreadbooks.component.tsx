import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { UserState } from "../store/store";
import { Book } from "./book";
import bookService from "./book.service";
import BookListComponent from "./booklist.component";

//Users can make a 'to read' list of books, and view it here
export default function ToReadBooksComponent() {
    
    const [retrievedBooks, setRetrievedBooks] = useState(false);
    const user = useSelector((state: UserState) => state.user);
    //Typescript won't let useState(Book[]) work, and if it's only set to an untyped array []
    //   then setBooks won't take an array of Book because it expects type never
    //   So make a variable with an empty Book[] to keep TS happy
    const temp: Book[] = [];
    const [books, setBooks] = useState(temp);

    useEffect(() => {
        //get the user's list of books to read
        console.log(`getting toread list for ${user.name}`);
        bookService.getBooksToRead(user.name).then((result) => {
            setBooks(result);
            console.log(JSON.stringify(books));
            setRetrievedBooks(true);
        });
    }, []);

    return (
        <ScrollView>
        <BookListComponent books={books} retrievedBooks={retrievedBooks} />
        </ScrollView>
    );
}