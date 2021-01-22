import React from 'react';
import { View, Text, Image } from 'react-native';

import { Book } from './book';

export default function BookDetailComponent() {
    //TODO make user class (Maddie?)
    //TODO have a way to get the user
    const userIsAuthor: boolean = true;

    //TODO get book: will we store a book in redux or use props?
    // For initial demo of this component, will make a dummy book
    const dummy: Book = new Book(
        'Dummy Title',
        'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg',
        'Coming soon, there will be a book. Any day now. Uh huh.',
        10
        );
    const book: Book = new Book();

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