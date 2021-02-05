import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import genreService from '../genre/genre.service';
import { changeBooks, getGenres } from '../store/actions';
import { GenreState, UserState } from '../store/store';
import style from '../global-styles';
import { Book } from './book';
import bookService from './book.service';
import authorService from '../author/author.service';

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

    const [validInput, setValidInput] = useState(false);

    // get the user and check that they are an author
    // if they are, get a list of genres for the picker
    useEffect(() => {
        // Use this to make sure we're not setting state after unmount
        let isMounted = true;

        //only authors can access this page
        if (user.role !== 'author') {
            nav.navigate('Home');
        } else {
            //get a list of genres for the picker, if it isn't already in the store
            if (genres.length === 0) {
                genreService.getGenres().then(data => {
                    dispatch(getGenres(data));
                }).catch(err => {
                    console.log(err);
                });
            }

            //get the user's authorid to complete book info
            authorService.getAuthorByUserId(user.name).then(data => {
                tempBook.authorid = data.id;
                if(isMounted) {
                    setBook(tempBook);
                }
            }).catch(err => {
                console.log(err);
            });
        }

        // The cleanup callback (called on unmount)
        return () => { isMounted = false };
    }, [dispatch]);

    const checkInput = () => {
        if (book.title &&
            book.page_count &&
            book.cover &&
            book.blurb &&
            book.genreid) {
            setValidInput(true);
        } else {
            setValidInput(false);
        }
    }

    //function for the genre picker in the form
    const pickGenre = (itemValue: React.ReactText) => {
        tempBook.genreid = Number(itemValue);
        setBook(tempBook);
        setGenreId(Number(itemValue));
        checkInput();
    }

    const submitBook = () => {
        console.log(JSON.stringify(book));
        bookService.addBook(book).then(() => {
            // Update the store
            bookService.getAllBooks().then((result) => {
                dispatch(changeBooks(result));
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
        nav.navigate('Home');
    }

    return (
        <View style={style.bookDetailContainer}>
            <Text h1 style={{textAlign:'center'}}>Submit your book</Text>
            <View>
                <Input
                    label='Title'
                    autoCapitalize='words'
                    returnKeyType='next'
                    onChangeText={text => {
                        tempBook.title = text;
                        setBook(tempBook);
                        checkInput();
                    }} />
                <Input
                    label='Link to cover page image'
                    onChangeText={text => {
                        tempBook.cover = text;
                        setBook(tempBook);
                        checkInput();
                    }} />
                <Input
                    label='Book description'
                    multiline
                    numberOfLines={4}
                    scrollEnabled
                    spellCheck={true}
                    onChangeText={text => {
                        tempBook.blurb = text;
                        setBook(tempBook);
                        checkInput();
                    }} />
                <Input
                    label='Pages'
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                        tempBook.page_count = Number(text);
                        setBook(tempBook);
                        checkInput();
                    }} />
                <Input
                    label='Link for access to book'
                    placeholder='(optional url)'
                    onChangeText={text => {
                        tempBook.link = text;
                        setBook(tempBook);
                        checkInput();
                    }} />
                {genres.length > 0 && <Picker
                    selectedValue={genreId}
                    style={{ height: 50, width: 100 }}
                    onValueChange={pickGenre}>
                    <Picker.Item
                        label='Choose genre'
                        value='' />
                    {genres.map((genre) => {
                        return <Picker.Item
                            key={genre.id}
                            label={genre.name}
                            value={genre.id} />
                    })}
                </Picker>}
            </View>
            <Button disabled={!validInput} type='outline' title='Publish!' onPress={submitBook} />
        </View>
    )
}