import React, { useEffect} from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { getGenres, getReviews, getAllAuthors } from './store/actions';
import AllBooksComponent from './book/allbooks.component';
import genreService from './genre/genre.service';
import reviewService from './review/review.service';
import authorService from './author/author.service';

export default function HomeComponent() {
      const dispatch = useDispatch();

    useEffect(() => {
        genreService.getGenres().then((genres) => {
            dispatch(getGenres(genres));
        });

        reviewService.getReviews().then((reviewsres) => {
            dispatch(getReviews(reviewsres));
        });

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