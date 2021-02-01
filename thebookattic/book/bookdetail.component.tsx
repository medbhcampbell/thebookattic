import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { StackParams } from '../router/router.component';
import { Book } from './book';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../store/store';
import bookService from './book.service';
import authorService from '../author/author.service';
import DeleteBookComponent from './deletebook.component';
import { Button } from 'react-native-elements';
import genreService from '../genre/genre.service';

interface BookDetailProps {
    route: RouteProp<StackParams, 'BookDetail'>
}

export default function BookDetailComponent(props: BookDetailProps) {

    const book: Book = props.route.params;

    //check if this user is the book's author
    const user = useSelector((state: UserState) => state.user);
    const [userIsAuthor, setUserIsAuthor] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [genreName, setGenreName] = useState('');
    const [toRead, setToRead] = useState(false);

    useEffect(() => {
        //useEffect callback cannot be async, making separate functions lets us use await
        // check if the user is the author: deleteBook only appears if true
        async function checkAuthor() {
            if (user.role === 'author') {
                try {
                    //check if the user is the author
                    const author = await authorService.getAuthorByUserId(user.name);
                    if (author.id === book.authorid) {
                        setUserIsAuthor(true);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        // get the name of the author and genre
        async function getBookInfo() {
            try {
                console.log('getting author name etc');
                const author = await authorService.getAuthorById(book.authorid);
                setAuthorName(`${author.firstname} ${author.lastname}`);
                const genre = await genreService.getGenreById(book.genreid);
                setGenreName(genre.name);
                console.log(`author name: ${authorName}, genre: ${genreName}`);
            } catch (err) {
                console.log(err);
            }
        }

        // check if this book is already on the user's to-read list: 'add to my to-read list'
        //    button only appears if false
        async function checkToRead() {
            try {
                const toRead = await bookService.getBooksToRead(user.name);
                if(toRead.find((thisBook) => thisBook.id === book.id)) {
                    setToRead(true);
                }
            } catch(err) {
                console.log(err);
            }
        }

        getBookInfo();
        checkToRead();
        checkAuthor();

    }, [setUserIsAuthor, setAuthorName, setToRead]);

    //TODO rating component (with stars?)
    return (
        <View>
            <Image source={{ uri: book.cover }}></Image>
            <Text>{book.title}</Text>
            <Text>{authorName}</Text>
            {book.link &&
                <Text>Access it here: {book.link}</Text>}
            <Text>{book.blurb}</Text>
            <Text>{genreName}</Text>
            <Text>Page count: {book.page_count}</Text>
            <Text>Average rating: {book.rating}</Text>
            {userIsAuthor || user.role === 'admin' ?
                <DeleteBookComponent bookid={book.id} />
                : <Text>My rating: TODO getRatingByUser</Text>}
            {!userIsAuthor && !toRead &&
                <Button title='Add to "To Read" list' onPress={() => bookService.addBookToRead(user.name, book.id)} />}
            {/*TODO <ReviewList></ReviewList>*/}
        </View>
    )
}