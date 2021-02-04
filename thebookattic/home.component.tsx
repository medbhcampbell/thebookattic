import React, { useEffect, useState } from 'react';
import { View, Text,Button } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import style from './global-styles';
import { BookAtticState } from './store/store';
import { getGenres, getReviews, getAllAuthors } from './store/actions';
import AllBooksComponent from './book/allbooks.component';
import { Book } from './book/book';
import { Review } from './review/review'
import genreService from './genre/genre.service';
import reviewService from './review/review.service';
import authorService from './author/author.service';

export default function HomeComponent() {
    const nav = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state: BookAtticState) => state.user);
    const books = useSelector((state: BookAtticState) => state.books);
    const reviews = useSelector((state: BookAtticState)=> state.reviews);
    const [unapprovedBooks, setUnapprovedBooks] = useState([] as Book[]);
    const [unapprovedReviews,setUnapprovedReviews]= useState([] as Review[]);

    function viewNeedApproval() {
        nav.navigate('UnapprovedBooks');
    }

    function viewReviewApproval() {
        nav.navigate('UnapprovedReviews');
    }

    useEffect(() => {
        setUnapprovedBooks(books.filter(item => { return !item.approved }));
        setUnapprovedReviews(reviews.filter(item => { return !item.approved }));

        genreService.getGenres().then((genres) => {
            dispatch(getGenres(genres));
        });
    }, [books, reviews]);

    useEffect(() => {
        reviewService.getReviews().then((reviewsres) => {
            dispatch(getReviews(reviewsres));
        });
    }, []);

    useEffect(() => {
        authorService.getAllAuthors().then((authors) => {
            dispatch(getAllAuthors(authors));
        });
    }, []);

    return (
        <View>
            {/* TODO: Put other stuff here, links, reccomendations, to-read list, etc (maybe move allbooks to a separate page)*/}
            {(user.role === 'admin' && unapprovedBooks.length > 0) && 
                <Card>
                    <View style={style.approvalNotice}>
                        <Text style={style.dangerText}>There are some books that need approval!</Text>
                        <Button title='View' color='red' onPress={viewNeedApproval}/>
                    </View>
                </Card>}
            {(user.role === 'admin' && unapprovedReviews.length > 0) && 
                <Card>
                    <View style={style.approvalNotice}>
                        <Text style={style.dangerText}>There are some reviews that need approval!</Text>
                        <Button title='View' color='blue' onPress={viewReviewApproval}/>
                    </View>
                </Card>}
            <AllBooksComponent/>
        </View>
    )
}