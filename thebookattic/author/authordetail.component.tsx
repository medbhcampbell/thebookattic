import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import style from '../global-styles';
import { AuthorState, BookState } from '../store/store';

export default function AuthorDetailComponent() {
    const navigation = useNavigation();
    const selectAuthor = (state: AuthorState) => state.author;
    const author = useSelector(selectAuthor);
    const selectBooks = (state: BookState) => state.books;
    const books = useSelector(selectBooks);
  
    function onBookSelect(index: number) {
        const book = books[index];
        navigation.navigate('BookDetail', book);
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