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
    const [filter, setFilter] = useState('');
    //have to render approved when no filter is applied
    //because useState is async and it's not using initial state upon first few renders
    let approved = props.books.filter(item=>{return item.approved});
    const [list, setList] = useState<Book[]>([]);
    function onBookSelect(index: number) {
        const book = filteredList[index];
        navigation.navigate('BookDetail', book);
    }
    //set new list whenever user changes a genre
    //if no filter applied it's going to be a list of approved books
    function handleFilter(itemValue: any){
        setFilter(itemValue);
        if(itemValue){
            setList(approved.filter(item=>item.genreid == itemValue));        
        }else{
            setList(approved);
        }
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
            onValueChange={handleFilter}>
                <Picker.Item
                    label='No Filter'
                    value='' />
                {genres.length > 0 && genres.map((genre) => {
                return <Picker.Item
                    key={genre.id}
                    label={genre.name}
                    value={genre.id} />
                })}
            </Picker>
            {props.retrievedBooks?
                ((filter == '' && approved.length > 0) || list.length > 0) ? 
                    <FlatList data={filter == '' ? approved : list} renderItem={BookPreview} keyExtractor={keyExtractor}/>
                : <Text style={style.h1}> No books found!</Text>
            : <ActivityIndicator/>}
        </View>
    )
}
