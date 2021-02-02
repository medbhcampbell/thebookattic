import React, { useEffect } from 'react';
import { View, Text, Image, Button, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { BookAtticState } from '../store/store';
import { Review } from '../review/review';
import genreService from '../genre/genre.service';
import { Book } from './book';

export default function BookRecListComponent() {
    const books = useSelector((state: BookAtticState) => state.books);
    const authors = useSelector((state: BookAtticState) => state.authors);
    const user = useSelector((state: BookAtticState) => state.user);
    const genres = useSelector((state: BookAtticState) => state.genres);
    const reviews = useSelector((state: BookAtticState) => state.reviews);
    
    console.log('BookRecList - books: ' + JSON.stringify(books));
    console.log('BookRecList - user: ' + JSON.stringify(user));
    console.log('BookRecList - genres: ' + JSON.stringify(genres));
    console.log('BookRecList - reviews: ' + JSON.stringify(reviews));

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

    function adjustBookRecRating(books: Book[], bookRecList: any, userReviews: any, index: number): number {
        let newRating = 0;

        

        return newRating;
    }
    
    let userReviews: Review[] = [];
    userReviews = reviews.filter(review => review.username == user.name);22
    
    console.log('BookRecList - userReviews: ' + JSON.stringify(userReviews));

    let userGenreRating = [];
    for (let i = 0; i < genres.length; i++) {
        userGenreRating[i] = { ...genres[i]};
        userGenreRating[i].rating = 0;
    }
    
    let userAuthorRating = [];
    for (let i = 0; i < authors.length; i++) {
        userAuthorRating[i] = { ...authors[i]};
        userAuthorRating[i].rating = 0;
    }
    
    console.log('BookRecList - userGenreRating: ' + JSON.stringify(userGenreRating));
    console.log('BookRecList - userAuthorRating: ' + JSON.stringify(userAuthorRating));

    for (let i = 0; i < userReviews.length; i++) {
        let bookIndex = books.findIndex(book => book.id == userReviews[i].bookid);
        let genreIndex = genres.findIndex(genre => genre.id == books[bookIndex].genreid);
        let authorIndex = authors.findIndex(author => author.id == books[bookIndex].authorid);
        userGenreRating[genreIndex].rating += adjustRecRating(userReviews[i].rating);
        userAuthorRating[authorIndex].rating += adjustRecRating(userReviews[i].rating);
        console.log(userGenreRating[genreIndex].name + ' rating now at ' + userGenreRating[genreIndex].rating);
        console.log(userAuthorRating[authorIndex].firstname + ' ' + userAuthorRating[authorIndex].lastname + ' rating now at ' + userAuthorRating[authorIndex].rating);
    }
    
    console.log('BookRecList - after change - userGenreRating: ' + JSON.stringify(userGenreRating));
    console.log('BookRecList - after change - userAuthorRating: ' + JSON.stringify(userAuthorRating));

    // let bookRecList = [];
    // for (let i = 0; i < userReviews.length; i++) {
    //     let index = books.findIndex(book => book.id == userReviews[i].bookid);
    //     bookRecList[index] = { ...books[index]};
    //     bookRecList[index].recRating = adjustBookRecRating(books, bookRecList, userReviews, index);
    // };

    // console.log('BookRecList - bookRecList: ' + JSON.stringify(bookRecList));

    return (
        <View>
            {(() => {
                if (books[0] && user && genres[0] && reviews[0]) {
                    return (
                        <View>
                            <Text>
                                Loaded
                            </Text>
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