import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import style from '../global-styles';
import { StackParams } from '../router/router.component';

import { getAuthor } from '../store/actions';
import { Book } from './book';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, AuthorState, GenreState, ReviewState } from '../store/store';
import bookService from './book.service';
import authorService from '../author/author.service';
import DeleteBookComponent from './deletebook.component';
import ReviewsComponent from '../review/reviews.component';
import { Text, Rating, Button } from 'react-native-elements';
import ApproveBookComponent from './approvebook.component';
import SubmitReviewComponent from '../review/submitReview.component';

interface BookDetailProps {
    route: RouteProp<StackParams, 'BookDetail'>
}

export default function BookDetailComponent(props: BookDetailProps) {
    const dispatch = useDispatch();
    const book: Book = props.route.params;

    const selectAuthor = (state: AuthorState) => state.author;
    const author = useSelector(selectAuthor);
    const genres = useSelector((state: GenreState) => state.genres);
    
    //check if this user is the book's author
    const user = useSelector((state: UserState) => state.user);
    const [userIsAuthor, setUserIsAuthor] = useState(false);

    //check if this book is already on the user's to-read or have-read list
    const [toRead, setToRead] = useState(false);
    const [haveRead, setHaveRead] = useState(false);

    // Check if this user has reviewed this book already    
    const reviews = useSelector((state: ReviewState) => state.reviews);
    const [haveReviewed, setHaveReviewed] = useState(false);


    useEffect(() => {

        // check if the user is the author: deleteBook only appears if true
        authorService.getAuthorById(book.authorid).then((authorres) => {
            dispatch(getAuthor(authorres));
        });

        // Check the reviews for one this user has submitted
        setHaveReviewed(reviews.find((review) => {
            return (review.bookid === book.id) && (review.username === user.name);
        }) !== undefined);

        //useEffect callback cannot be async, making separate functions lets us use await 
        async function checkAuthor() {
            if (user.role === 'author') {
                try {
                    //check if the user is the author
                    const userAuthor = await authorService.getAuthorByUserId(user.name);
                    if (userAuthor.id === book.authorid) {
                        setUserIsAuthor(true);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        // check if this book is already on the user's to-read/have-read list: 'add to my to-read list'
        //    button only appears if false
        async function checkOnList() {
            try {
                const toReadnow = await bookService.getBooksToRead(user.name);
                const haveReadnow = await bookService.getBooksHaveRead(user.name);
                if (toReadnow.find((thisBook) => thisBook.id === book.id)) {
                    console.log('found it');
                    setToRead(true);
                } else if (haveReadnow.find((thisBook) => thisBook.id === book.id)) {
                    setHaveRead(true);
                }
            } catch (err) {
                console.log(err);
            }
        }

        checkOnList();
        checkAuthor();

    }, [setUserIsAuthor, setToRead, reviews]);

    return (
        <View>
            <View style={style.bookDetailContainer}>
                {!book.approved &&
                    <Text style={style.dangerText}>This book needs approval before it becomes public!</Text>}
                <Text h1 style={{ textAlign: 'center' }}>{book.title}</Text>
                <Image source={{ uri: book.cover }}></Image>
                <Text>Author: {author.firstname + ' ' + author.lastname}</Text>
                {!!book.link &&
                    <Text>Access it here: {book.link}</Text>}
                <Text>{book.blurb}</Text>
                <Text>{genres.length && genres.find(item => item.id == book.genreid)?.name}</Text>
                <Text>Page count: {book.page_count}</Text>
                <Text>Average rating:
                    <Rating ratingBackgroundColor='#F9F9F9' imageSize={20} readonly startingValue={book.rating} />
                </Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {userIsAuthor || user.role === 'admin' ?
                        <DeleteBookComponent bookid={book.id} approved={book.approved} />
                        : <Text>My rating: TODO getRatingByUser</Text>}
                    {(!book.approved && user.role === 'admin') &&
                        <ApproveBookComponent id={book.id} />}
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {!userIsAuthor && !toRead && !haveRead &&
                        <Button
                            title='Add to "To Read" list'
                            type='outline'
                            onPress={async () => {
                                await bookService.addBookToRead(user.name, book.id);
                                setToRead(true);
                            }}
                        />}
                    {!userIsAuthor && !haveRead &&
                        <Button
                            title='Add to "Have Read" list'
                            type='outline'
                            onPress={async () => {
                                await bookService.addBookHaveRead(user.name, book.id);
                                setHaveRead(true);
                                setToRead(false);
                            }}
                        />}
                </View>
            </ View>
            {!haveReviewed &&
                <View style={style.bookDetailContainer}>
                    <SubmitReviewComponent id={book.id} />
                </View>}
            <View style={style.bookDetailContainer}>
                <ReviewsComponent book={book} />
            </View>
        </View>
    )
}