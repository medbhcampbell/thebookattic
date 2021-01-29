import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { StackParams } from '../router/router.component';
import { Book } from './book';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../store/store';
import bookService from './book.service';
import authorService from '../author/author.service';
import DeleteBookComponent from './deletebook.component';

interface BookDetailProps {
    route: RouteProp<StackParams, 'BookDetail'>
}

export default function BookDetailComponent(props: BookDetailProps) {

    const book: Book = props.route.params;

    //check if this user is the book's author
    const user = useSelector((state: UserState) => state.user);
    let userIsAuthor = false;

    useEffect(()=> {
        if (user.role === 'author') {
            authorService.getAuthorById(book.authorid).then((author) => {
                if (author.authorid === book.authorid) {
                    userIsAuthor = true;
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [userIsAuthor]);

    //TODO rating component (with stars?)
    return (
        <View>
            <Image source={{ uri: book.cover }}></Image>
            <Text>{book.title}</Text>
            <Text>Author: TODO getAuthorByID</Text>
            {book.link &&
                <Text>Access it here: {book.link}</Text>}
            <Text>{book.blurb}</Text>
            <Text>{book.genreid}: TODO getGenreByID</Text>
            <Text>Page count: {book.page_count}</Text>
            <Text>Average rating: {book.rating}</Text>
            {userIsAuthor || user.role === 'admin' ?
                <DeleteBookComponent bookid={book.id}/>
                : <Text>My rating: TODO getRatingByUser</Text>}
            {/*TODO <ReviewList></ReviewList>*/}
        </View>
    )
}