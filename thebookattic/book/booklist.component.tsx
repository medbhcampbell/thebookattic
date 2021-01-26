import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

import style from '../global-styles';
import { Book } from './book';
import bookService from './book.service';
import { BookState } from '../store/store';
import { changeBooks } from '../store/actions';

export default function BookListComponent() {
    const books = useSelector((state: BookState) => state.books);
    const dispatch = useDispatch();
    // Have the books been retrieved?
    const [retrievedBooks, setRetrievedBooks] = useState(false);

    useEffect(()=>{
        if(books.length <= 0) {
            // If there's no books in the store, use the service to retrieve them
            bookService.getAllBooks().then((result)=>{
                dispatch(changeBooks(result));
                setRetrievedBooks(true);
            }).catch((err)=>{
                console.error(err);
                setRetrievedBooks(true);
            });
        } else {
            setRetrievedBooks(true);
        }
    }, [books]);

    // The component to be rendered for every book
    const BookPreview = (params: any) => {
        return (
            <Card>
                <Text>{params.item.title}</Text>
                <Image style={style.previewImg} source={{uri: params.item.cover}}/>
            </Card>
        );
    }

    return (
        <View>
            {retrievedBooks?
                <FlatList contentContainerStyle={style.bookList} data={books} renderItem={BookPreview}/>
                : <ActivityIndicator/>}
        </View>
    )
}