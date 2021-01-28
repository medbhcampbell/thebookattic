import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Genre from '../genre/genre';
import genreService from '../genre/genre.service';
import { getGenres } from '../store/actions';
import { GenreState, UserState } from '../store/store';
import style from '../global-styles';

import { Book } from './book';
import bookService from './book.service';

export default function SubmitBookComponent() {
    const nav = useNavigation();
    const dispatch = useDispatch();

    const user = useSelector((state: UserState) => state.user);
    const genres = useSelector((state: GenreState) => state.genres);

    const [book, setBook] = useState(new Book());
    //genreId needs its own state because otherwise the picker doesn't update
    const [genreId, setGenreId] = useState(0);
    // have a temporary variable that stores new info about the book before calling setBook
    //    because directly setting state variables can be unpredictable
    const tempBook = book;

    // get the user and check that they are an author
    // if they are, get a list of genres for the picker
    useEffect(() => {
        // if (user.role !== 'author') {
        //     nav.navigate('Home');
        if(false) {
            console.log('Should test that user is author, put it back when login works');
        } else {
            genreService.getGenres().then(data => {
                dispatch(getGenres(data));
                setGenreId(genres[0].id);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [dispatch]);

    //function for the genre picker in the form
    //TODO should there be a separate genrepicker component shared by this and booklist?
    const pickGenre = (itemValue: React.ReactText) => {
        tempBook.genreid = Number(itemValue);
        setBook(tempBook);
        setGenreId(Number(itemValue));
    }

    const submitBook = () => {
        bookService.addBook(book);
        nav.navigate('AuthorDetail');
    }

    return (
        <View>
            <Text>Submit your book</Text>
            <View>
                <TextInput
                    style={style.input}
                    placeholder='Title'
                    autoCapitalize='words'
                    returnKeyType='next'
                    onChangeText={text => {
                        tempBook.title = text;
                        setBook(tempBook);
                    }} />
                <TextInput
                    style={style.input}
                    placeholder='Link to cover page image'
                    onChangeText={text => {
                        tempBook.cover = text;
                        setBook(tempBook);
                    }} />
                <TextInput
                    style={style.input}
                    placeholder='Book description'
                    multiline
                    numberOfLines={4}
                    scrollEnabled
                    spellCheck={true}
                    onChangeText={text => {
                        tempBook.blurb = text;
                        setBook(tempBook);
                    }} />
                <TextInput
                    style={style.input}
                    placeholder='Pages'
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                        tempBook.page_count = Number(text);
                        setBook(tempBook);
                    }} />
                <TextInput
                    style={style.input}
                    placeholder='Link for access to book'
                    onChangeText={text => {
                        tempBook.link = text;
                        setBook(tempBook);
                    }} />
                {genres.length > 0 && <Picker
                    selectedValue={genreId}
                    style={{ height: 50, width: 100 }}
                    onValueChange={pickGenre}>
                    {genres.map((genre) => {
                        return <Picker.Item
                            key={genre.id}
                            label={genre.name}
                            value={genre.id} />
                    })}
                </Picker>}
            </View>
            <Button title='Publish!' onPress={submitBook} />
        </View>
    )
}