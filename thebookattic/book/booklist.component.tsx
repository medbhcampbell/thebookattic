import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

import style from '../global-styles';
import { Book } from './book';
import { useDispatch, useSelector } from 'react-redux';
import { GenreState } from '../store/store';
import { getGenres } from '../store/actions';
import genreService from '../genre/genre.service';
import userService from '../user/user.service';

interface BookListProps {
    // The books to be displayed
    books: Book[],
    // Have the books been retrieved? 
    retrievedBooks: boolean
}

export default function BookListComponent(props: BookListProps) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const genres = useSelector((state: GenreState) => state.genres);
    const [filter, setFilter] = useState(0);
    const approved = props.books.filter(item=>{return item.approved});
    const [filteredList, setList] = useState(approved);

    function onBookSelect(index: number) {
        const book = filteredList[index];
        navigation.navigate('BookDetail', book);
    }

    function handleFilter(itemValue: any){
        setFilter(itemValue);
        const newList = approved.filter((item)=>{
            return itemValue !== 0 && item.genreid == itemValue;
        });
        setList(newList);
    }

    useEffect(() => {
        genreService.getGenres().then(data=>{
            dispatch(getGenres(data));
        }).catch(err=>{
            console.log(err);
        });
    }, [dispatch]);

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
            <Picker
            selectedValue={filter}
            style={{height: 50, width: 100}}
            onValueChange={handleFilter}>
                {genres.length > 0 && genres.map((genre) => {
                return <Picker.Item
                    key={genre.id}
                    label={genre.name}
                    value={genre.id} />
                })}
            </Picker>
            {props.retrievedBooks?
                (filteredList.length > 0) ? 
                    <FlatList data={filteredList} renderItem={BookPreview} keyExtractor={keyExtractor}/>
                    : <Text style={style.h1}> No books found!</Text>
                : <ActivityIndicator/>}
        </View>
    )
}
