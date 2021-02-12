import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Rating } from 'react-native-elements';
import { useSelector } from 'react-redux';

import style from '../global-styles';
import { AuthorState, BookState } from '../store/store';
import BookListComponent from '../book/booklist.component';
import { useFocusEffect } from '@react-navigation/native';
import authorService from './author.service';

export default function AuthorDetailComponent() {
    const selectAuthor = (state: AuthorState) => state.author;
    const author = useSelector(selectAuthor);
    const selectBooks = (state: BookState) => state.books;
    const books = useSelector(selectBooks);

    //author rating needs state to update reliably
    const [rating, setRating] = useState(0);

    useFocusEffect(React.useCallback(() => {
        async function getRating() {
            try {
                setRating(await authorService.getAuthorRating(author.id));
            } catch (err) {
                console.log(err);
            }
        }
        getRating();
    }, [author]));

    return (
        <ScrollView>
            <View style={style.authorDetailContainer}>
                <Image style={style.authorPreviewImg} source={{ uri: author.picture }} />
                <Text style={style.h1}>{author.firstname + ' ' + author.lastname}</Text>
                <Text>Average book rating :
                    <Rating ratingBackgroundColor='#F9F9F9' imageSize={20} readonly startingValue={rating} /></Text>
                <Text>About : </Text>
                <Text>{author.bio}</Text>
            </View>
            <BookListComponent
                books={books.filter(item => item.approved && item.authorid === author.id)}
                retrievedBooks={true} />
        </ScrollView>
    )
}