import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
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

    useEffect(() => {
        genreService.getGenres().then((genres) => {
            dispatch(getGenres(genres));
        });
    }, []);

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
        <ScrollView>
            {/* TODO: Put other stuff here, links, reccomendations, to-read list, etc (maybe move allbooks to a separate page)*/}
            <AllBooksComponent/>
        </ScrollView>
    )
}