import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';

import style from '../global-styles';
import { Book } from './book';

export default function BookListComponent() {

    const [retrievedBooks, setRetrievedBooks] = useState(null); 

    useEffect(()=>{
        // TODO: Get book list from either database or store
    }, []);

    return (
        <View>
            <Text style={style.h1}>All Books</Text>
            {retrievedBooks?
                <Text>I"m going to be a book someday</Text> /*List books here  */
                : <ActivityIndicator/>}
        </View>
    )
}