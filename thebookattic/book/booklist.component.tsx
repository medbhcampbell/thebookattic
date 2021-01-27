import React from 'react';
import { View, Text, Image, ActivityIndicator, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import style from '../global-styles';
import { Book } from './book';

interface BookListProps {
    // The books to be displayed
    books: Book[],
    // Have the books been retrieved? 
    retrievedBooks: boolean
}

export default function BookListComponent(props: BookListProps) {
    const navigation = useNavigation();

    function onBookSelect(index: number) {
        const book = props.books[index];
        navigation.navigate('BookDetail', book);
    }

    // The component to be rendered for every book
    const BookPreview = (params: any) => {
        return (
            <Pressable onPress={()=> onBookSelect(params.index)}>
                <Card>
                    <Text style={style.bookPreviewText}>{params.item.title}</Text>
                    <Image style={style.bookPreviewImg} source={{uri: params.item.cover}}/>
                </Card>
            </Pressable>
        );
    }

    // Function to set key for each list component (it gets mad if we dont do this)
    const keyExtractor = (item: object, index: number) => { return index.toString(); }

    return (
        <View style={{alignItems: 'center'}}>
            {props.retrievedBooks?
                (props.books.length > 0) ? 
                    <FlatList data={props.books} renderItem={BookPreview} keyExtractor={keyExtractor}/>
                    : <Text style={style.h1}>No books found!</Text>
                : <ActivityIndicator/>}
        </View>
    )
}
