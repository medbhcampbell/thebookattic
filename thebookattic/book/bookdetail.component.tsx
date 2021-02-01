import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import style from '../global-styles';
import { StackParams } from '../router/router.component';

import { getAuthor } from '../store/actions';
import { Book } from './book';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, AuthorState } from '../store/store';
import bookService from './book.service';
import authorService from '../author/author.service';
import DeleteBookComponent from './deletebook.component';
import ApproveBookComponent from './approvebook.component';

interface BookDetailProps {
    route: RouteProp<StackParams, 'BookDetail'>
}

export default function BookDetailComponent(props: BookDetailProps) {
    const dispatch = useDispatch();
    const book: Book = props.route.params;
    const selectAuthor = (state: AuthorState) => state.author;
    const author = useSelector(selectAuthor);


    //check if this user is the book's author
    const user = useSelector((state: UserState) => state.user);
    const [userIsAuthor, setUserIsAuthor] = useState(false);

    useEffect(() => {
        authorService.getAuthorById(book.authorid).then((author) => {
            dispatch(getAuthor(author));
        });
    }, []);

    useEffect(() => {
        //useEffect callback cannot be async, this lets us use await 
        async function checkAuthor() {
            if (user.role === 'author') {
                try {
                    const author = await authorService.getAuthorByUserId(user.name);
                    if (author.id === book.authorid) {
                        setUserIsAuthor(true);
                    }
                } catch (err) {
                    console.log(err);
                };
            }
        }

        checkAuthor();
    }, [setUserIsAuthor]);

    //TODO rating component (with stars?)
    return (
        <View>
            {!book.approved &&
                <Text style={style.dangerText}>This book needs approval before it becomes public!</Text>}
            <Image source={{ uri: book.cover }}></Image>
            <Text>{book.title}</Text>
            <Text>Author: {author.firstname + ' ' + author.lastname}</Text>
            {book.link &&
                <Text>Access it here: {book.link}</Text>}
            <Text>{book.blurb}</Text>
            <Text>{book.genreid}: TODO getGenreByID</Text>
            <Text>Page count: {book.page_count}</Text>
            <Text>Average rating: {book.rating}</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                {userIsAuthor || user.role === 'admin' ?
                    <DeleteBookComponent bookid={book.id} approved={book.approved}/>
                    : <Text>My rating: TODO getRatingByUser</Text>}
                {(!book.approved && user.role === 'admin') &&
                    <ApproveBookComponent id={book.id} />}
            </View>
            {/*TODO <ReviewList></ReviewList>*/}
        </View>
    )
}