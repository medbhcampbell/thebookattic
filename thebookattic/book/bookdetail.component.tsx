import React from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { StackParams } from '../router/router.component';
import { Book } from './book';

interface BookDetailProps {
    route: RouteProp<StackParams, 'BookDetail'>
}

export default function BookDetailComponent(props: BookDetailProps) {
    //TODO make user class (Maddie?)
    //TODO have a way to get the user
    const userIsAuthor: boolean = true;

    const book: Book = props.route.params;

    //TODO how do you make links in ReactNative? <a> equivalent?
    //TODO rating component (with stars?)
    return (
        <View>
            <Image source={{ uri: book.cover}}></Image>
            <Text>{book.title}</Text>
            <Text>Author: TODO getAuthorByID</Text>
            {book.link &&
            <Text>Access it here: {book.link}</Text>}
            <Text>{book.blurb}</Text>
            <Text>{book.genre}: TODO getGenreByID</Text>
            <Text>Page count: {book.pageCount}</Text>
            <Text>Average rating: {book.rating}</Text>
            {userIsAuthor?
                <></>/*<DeleteBookComponent></DeleteBookComponent>*/
            : <Text>My rating: TODO getRatingByUser</Text>}
            {/*TODO <ReviewList></ReviewList>*/}
        </View>
    )
}