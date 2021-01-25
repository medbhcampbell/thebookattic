import React from 'react';
import { View, Text, Image } from 'react-native';

import BookListComponent from './book/booklist.component';

export default function HomeComponent() {

    return (
        <View>
            <BookListComponent/>
        </View>
    )
}