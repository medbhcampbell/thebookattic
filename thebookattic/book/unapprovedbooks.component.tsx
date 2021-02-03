import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Text, View } from "react-native";


import { BookState } from "../store/store";
import { Book } from "./book";
import BookListComponent from "./booklist.component";
import styles from '../global-styles';

export default function UnapprovedBooksComponent() {
    const books = useSelector((state: BookState) => state.books);
    const [unapprovedBooks, setUnapprovedBooks] = useState([] as Book[]);
    
    useEffect(()=>{
        // Get unapproved books
        setUnapprovedBooks(books.filter(item=>{return !item.approved}));
    }, []);

    return (
        <View style={{alignItems: 'center'}}>
            <Text style={styles.h1}>{unapprovedBooks? 'Books Pending Approval:' : 'No pending approvals!'}</Text>
            <BookListComponent books={unapprovedBooks} retrievedBooks={true}/>
        </View>
    );
}