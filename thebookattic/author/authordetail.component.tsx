import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { State } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import style from '../global-styles';
import { AuthorState, BookState } from '../store/store';
import { getAuthor } from '../store/actions';
import { Author } from './author';
import authorService from './author.service';

export default function AuthorDetailComponent() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const selectAuthor = (state: AuthorState) => state.author;
    const author = useSelector(selectAuthor);
    const selectBooks = (state: BookState) => state.books;
    const books = useSelector(selectBooks);

    // useEffect(() => {
    //     authorService.getAuthorById(1).then((author) => {
    //         dispatch(getAuthor(author));
    //     })
    // }, [dispatch]);
    console.log('AuthorDetailComponent - books: ' + JSON.stringify(books));
    console.log('AuthorDetailComponent - author: ' + JSON.stringify(author));
    let newAuthor = new Author();
    newAuthor.authorid = 9;
    newAuthor.userid = 111116;
    newAuthor.firstname = 'Joe';
    newAuthor.lastname = 'Author';
    newAuthor.avgrating = 3.7;
    newAuthor.bio = 'bio';
    newAuthor.picture = 'url';

    let updatedAuthor = new Author();
    updatedAuthor.authorid = 7;
    updatedAuthor.userid = 111111;
    updatedAuthor.firstname = 'Jake';
    updatedAuthor.lastname = 'Austin';
    updatedAuthor.avgrating = 5.0;
    updatedAuthor.bio = 'Very English';
    updatedAuthor.picture = 'url';

    console.log(newAuthor);
    console.log(updatedAuthor);
    
    function onAddSelect() {
        authorService.addAuthor(newAuthor);
    }

    function onUpdateSelect() {
        authorService.updateAuthor(updatedAuthor);
    }

    function onRemoveSelect() {
        authorService.removeAuthor('7');
    }

    function onBookSelect(index: number) {
        const book = books[index];
        navigation.navigate('BookDetail', book);
    }

    function onGetAuthorSelect() {
        //let a: any = { ...author };
        authorService.getAuthorById(1).then((author) => {
            console.log(author);
        });
        //console.log(a.firstname + ' ' + a.lastname);
    }
    
    return (
        <ScrollView>
            <View style={{alignItems: 'center'}}>
                <Image style={style.authorPreviewImg} source={{uri: author.picture}}/>
                <Text>{author.firstname + ' ' + author.lastname}</Text>
                <Text>Average book rating : {author.avgrating}</Text>
                <Text>About : </Text>
                <Text>{author.bio}</Text>
                <Text>Books by {author.firstname + ' ' + author.lastname}</Text>
                {books.map((value, index: number) => {
                    if (value.authorid === author.id) {
                        return (
                            <View>
                                <Pressable onPress={()=> onBookSelect(index)}>
                                    <Card>
                                        <Text style={style.bookPreviewText}>{books[index].title}</Text>
                                        <Image style={style.bookPreviewImg} source={{uri: books[index].cover}}/>
                                    </Card>
                                </Pressable>
                            </View>
                        );
                    } else {
                        return null;
                    }
                })}
            </View>
        </ScrollView>
    )
}