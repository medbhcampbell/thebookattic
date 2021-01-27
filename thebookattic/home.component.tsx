import React from 'react';
import { View, Text, Image } from 'react-native';

import AllBooksComponent from './book/allbooks.component';

export default function HomeComponent() {

    return (
        <View>
            {/* TODO: Put other stuff here, links, reccomendations, to-read list, etc (maybe move allbooks to a separate page)*/}
            <AllBooksComponent/>
        </View>
    )
}