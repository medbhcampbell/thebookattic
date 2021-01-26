import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ListRenderItem } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

import style from '../global-styles';
import { Book } from './book';

export default function BookListComponent() {
    // Have the books been retrieved?
    const [retrievedBooks, setRetrievedBooks] = useState(false);
    // The books themselves
    const [bookList, setBookList] = useState([] as Book[]);

    // The component to be rendered for every book
    const BookPreview = (params: any) => {
        return (
            <Card>
                <Text>{params.item.title}</Text>
                <Image style={style.previewImg} source={{uri: params.item.cover}}/>
            </Card>
        );
    }

    const tempList = [new Book('Dummy Title', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title2', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title3', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title4', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title5', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title6', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title7', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title8', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title9', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title10', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title11', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title12', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title13', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
        new Book('Dummy Title14', 'https://www.7thdarlingtonseascouts.org.uk/wp-content/uploads/Watch-this-space.jpg', 'Coming soon, there will be a book. Any day now. Uh huh.', 10),
    ];

    useEffect(()=>{
        // TODO: Get book list from either database or store
        setBookList(tempList);
        setRetrievedBooks(true);
    }, []);

    return (
        <View>
            {retrievedBooks?
                <FlatList contentContainerStyle={style.bookList} data={bookList} renderItem={BookPreview}/>
                : <ActivityIndicator/>}
        </View>
    )
}