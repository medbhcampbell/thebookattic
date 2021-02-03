import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import style from '../global-styles';
import { BookAtticState } from '../store/store';
import { changeBooks, getGenres, getReviews, getAllAuthors } from "../store/actions";
import { Review } from '../review/review';
import { Book } from './book';
import bookService from "./book.service";
import genreService from '../genre/genre.service';
import reviewService from '../review/review.service';
import authorService from '../author/author.service';

export default function BookRecListComponent() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const books = useSelector((state: BookAtticState) => state.books);
    const authors = useSelector((state: BookAtticState) => state.authors);
    const user = useSelector((state: BookAtticState) => state.user);
    const genres = useSelector((state: BookAtticState) => state.genres);
    const reviews = useSelector((state: BookAtticState) => state.reviews);
    const [retrievedBooks, setRetrievedBooks] = useState(false);
    const [approved, setApproved] = useState([] as Book[]);
    let userReviews: Review[] = [];
    let userGenreRating: any = [];
    let userAuthorRating: any = [];
    let bookRecList: any = [ ...books ];
    
    // I don't actually know if the useEffects help, but they're not hurting, so...
    useEffect(()=>{
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
    }, []);

    useEffect(() => {
        genreService.getGenres().then((genres) => {
            dispatch(getGenres(genres));
        });
    }, []);

    useEffect(() => {
        reviewService.getReviews().then((reviews) => {
            dispatch(getReviews(reviews));
        });
    }, []);

    useEffect(() => {
        authorService.getAllAuthors().then((authors) => {
            dispatch(getAllAuthors(authors));
        });
    }, []);
  
    function onBookSelect(index: number) {
        let bookRecToBook = bookRecList[index];
        delete bookRecToBook.recRating;
        const book: Book = bookRecToBook;
        navigation.navigate('BookDetail', book);
    }

    // Adjusts the user's recommendation rating for each genre and author
    function adjustRecRating(reviewRating: number): number {
        let ratingChange: number = 0;
        switch (reviewRating) {
            case 1:
                ratingChange = -2;
                break;
            case 2:
                ratingChange = -1;
                break;
            case 3:
                ratingChange = 0;
                break;
            case 4:
                ratingChange = 1;
                break;
            case 5:
                ratingChange = 2;
                break;
        }
        console.log('ratingChange: ' + ratingChange);
        return ratingChange;
    }

    // Applies the user's recommendation ratings to each book
    function adjustBookRecRating(genreIndex: number, authorIndex: number): number {
        let ratingChange = 0;

        ratingChange += userGenreRating[genreIndex].rating;
        ratingChange += userAuthorRating[authorIndex].rating;

        return ratingChange;
    }

    // Filters for user's own reviews and add rating property to user's genre and author lists
    userReviews = reviews.filter(review => review.username == user.name);
    for (let i = 0; i < genres.length; i++) {
        userGenreRating[i] = { ...genres[i]};
        userGenreRating[i].rating = 0;
    }
    for (let i = 0; i < authors.length; i++) {
        userAuthorRating[i] = { ...authors[i]};
        userAuthorRating[i].rating = 0;
    }

    // Adjusts the user's recommendation rating for each genre and author
    for (let i = 0; i < userReviews.length; i++) {
        let bookIndex = books.findIndex(book => book.id == userReviews[i].bookid);
        let genreIndex = genres.findIndex(genre => genre.id == books[bookIndex].genreid);
        let authorIndex = authors.findIndex(author => author.id == books[bookIndex].authorid);
        userGenreRating[genreIndex].rating += adjustRecRating(userReviews[i].rating);
        userAuthorRating[authorIndex].rating += adjustRecRating(userReviews[i].rating);
    }

    // Applies the user's recommendation ratings to each book, then sorts the list by rating
    for (let i = 0; i < bookRecList.length; i++) {
        let genreIndex = genres.findIndex(genre => genre.id == bookRecList[i].genreid);
        let authorIndex = authors.findIndex(author => author.id == bookRecList[i].authorid);
        bookRecList[i].recRating = 0;
        bookRecList[i].recRating += adjustBookRecRating(genreIndex, authorIndex);
    };
    bookRecList.sort((a: any, b: any) => (a.recRating < b.recRating) ? 1 : -1);

    return (
        <View style={{alignItems: 'center'}}>
            {(() => {
                if (bookRecList[0]) {
                    return (
                        <View>
                                {bookRecList.map((value, index: number) => {
                                    return (
                                        <View>
                                            <Pressable onPress={()=> onBookSelect(index)}>
                                                <Card>
                                                    <Text style={style.bookPreviewText}>{bookRecList[index].title}</Text>
                                                    <Image style={style.bookPreviewImg} source={{uri: bookRecList[index].cover}}/>
                                                </Card>
                                            </Pressable>
                                        </View>
                                    );
                                })}
                        </View>
                    )
                } else {
                    return (
                        <View>
                            <Text>
                                Loading...
                            </Text>
                        </View>
                    )
                }
            })()}
        </View>
    )
}