import React from 'react';
import { View, Text, Image, Button } from 'react-native';

export default function DeleteBookComponent() {
    //TODO make this actually do something
    function deleteBook() {
        console.log('Delete this book');
        console.log('Navigate back to author page (?)');
    }

    return (
        <View>
            <Button title='DeleteBook' onPress={deleteBook}>Delete book</Button>
        </View>
    )
}