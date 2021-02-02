import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import style from './global-styles';
import { BookState, UserState } from './store/store';
import { getGenres, getReviews, getAllAuthors } from './store/actions';
import AllBooksComponent from './book/allbooks.component';
import { Book } from './book/book';
import genreService from './genre/genre.service';
import reviewService from './review/review.service';
import authorService from './author/author.service';

export default function HomeComponent() {
    const nav = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state: UserState) => state.user);
    const books = useSelector((state: BookState) => state.books);
    const [unapprovedBooks, setUnapprovedBooks] = useState([] as Book[]);

    function viewNeedApproval() {
        nav.navigate('UnapprovedBooks');
    }

    function toBookRecList() {
        nav.navigate('BookRecList');
    }

    useEffect(() => {
        setUnapprovedBooks(books.filter(item => {
            return !item.approved}));
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

    return (
        <View>
            {/* TODO: Put other stuff here, links, reccomendations, to-read list, etc (maybe move allbooks to a separate page)*/}
            {(user.role === 'admin' && unapprovedBooks) && 
                <Card>
                    <View style={style.approvalNotice}>
                        <Text style={style.dangerText}>There are some books that need approval!</Text>
                        <Button title='View' color='red' onPress={viewNeedApproval}/>
                    </View>
                </Card>}
            <AllBooksComponent/>
            <Pressable onPress={toBookRecList}>
                <Text>
                    Test BookRecList
                </Text>
            </Pressable>
        </View>
    )
}