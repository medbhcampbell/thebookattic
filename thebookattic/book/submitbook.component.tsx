import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Genre from '../genre/genre';
import GenrePickerComponent from '../genre/genrepicker.component';
import { UserState } from '../store/store';

import { Book } from './book';

export default function SubmitBookComponent() {
    const nav = useNavigation();
    const user = useSelector((state: UserState) => state.user);

    // get the user and check that they are an author
    useEffect(() => {
        if(user.role !== 'author') {
            nav.navigate('HomePage');
        }
    }, []);

    const [book, setBook] = useState(new Book());
    // have a temporary variable that stores new info about the book before calling setBook
    // because directly setting state variables can be unpredictable
    const tempBook = book;

    //TODO frontend book service
    //TODO navigate back to author's page
    const submitBook = () => {
        console.log(`Call bookService to addBook ${JSON.stringify(book)}`);
        //nav.navigate('HomePage');
    }

    return (
        <View>
            <Text>Submit your book</Text>
            <View>
                <TextInput
                    placeholder='Title'
                    autoCapitalize='words'
                    returnKeyType='next'
                    onChangeText={text => {
                        tempBook.title = text;
                        setBook(tempBook);
                    }}/>
                <TextInput
                    placeholder='Link to cover page image'
                    onChangeText={text => {
                        tempBook.cover = text;
                        setBook(tempBook);
                    }}/>
                <TextInput
                    placeholder='Book description'
                    multiline
                    numberOfLines={4}
                    scrollEnabled
                    spellCheck={true}
                    onChangeText={text => {
                        tempBook.blurb = text;
                        setBook(tempBook);
                    }}/>
                <TextInput
                    placeholder='Pages'
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                        tempBook.page_count = Number(text);
                        setBook(tempBook);
                    }}/>
                <TextInput
                    placeholder='Link for access to book'
                    onChangeText={text => {
                        tempBook.link = text;
                        setBook(tempBook);
                    }}/>
                <GenrePickerComponent pickGenre={(genre: Genre)=> {
                    tempBook.genreid = genre.id;
                    setBook(tempBook);
                }}/>
            </View>
            <Button title='Publish!' onPress={submitBook}/>
        </View>
    )
}