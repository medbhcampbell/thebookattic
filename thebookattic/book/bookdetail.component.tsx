import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import style from '../global-styles';
import { StackParams } from '../router/router.component';

import { getAuthor } from '../store/actions';
import { Book } from './book';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, AuthorState } from '../store/store';
import bookService from './book.service';
import authorService from '../author/author.service';
import DeleteBookComponent from './deletebook.component';
import genreService from '../genre/genre.service';
import ReviewsComponent from '../review/reviews.component';
import { Button, Divider } from 'react-native-elements';
import ApproveBookComponent from './approvebook.component';

interface BookDetailProps {
    route: RouteProp<StackParams, 'BookDetail'>
}

export default function BookDetailComponent(props: BookDetailProps) {
    const dispatch = useDispatch();
    const book: Book = props.route.params;

    const navigation = useNavigation();

    const selectAuthor = (state: AuthorState) => state.author;
    const author = useSelector(selectAuthor);

    //check if this user is the book's author
    const user = useSelector((state: UserState) => state.user);
    const [userIsAuthor, setUserIsAuthor] = useState(false);
    const [genreName, setGenreName] = useState('');
    const [toRead, setToRead] = useState(false);

    useEffect(() => {
        
        // check if the user is the author: deleteBook only appears if true
        authorService.getAuthorById(book.authorid).then((author) => {
            dispatch(getAuthor(author));
        });

        //useEffect callback cannot be async, making separate functions lets us use await 
        async function checkAuthor() {
            if (user.role === 'author') {
                try {
                    //check if the user is the author
                    const userAuthor = await authorService.getAuthorByUserId(user.name);
                    if (userAuthor.id === book.authorid) {
                        setUserIsAuthor(true);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        // get the name of the author and genre
        async function getGenre() {
            try {
                const genre = await genreService.getGenreById(book.genreid);
                setGenreName(genre.name);
            } catch (err) {
                console.log(err);
            }
        }

        // check if this book is already on the user's to-read list: 'add to my to-read list'
        //    button only appears if false
        async function checkToRead() {
            try {
                const toRead = await bookService.getBooksToRead(user.name);
                //TODO change this to a check on book id when getBookFromJoinTable in backend is fixed
                if(toRead.find((thisBook) => thisBook.title === book.title)) {
                    console.log('found it');
                    setToRead(true);
                }
            } catch(err) {
                console.log(err);
            }
        }

        getGenre();
        checkToRead();
        checkAuthor();

    }, [setUserIsAuthor, setToRead]);

    //TODO rating component (with stars?)
    return (
        <>
        <View>
            {!book.approved &&
                <Text style={style.dangerText}>This book needs approval before it becomes public!</Text>}
            <Image source={{ uri: book.cover }}></Image>
            <Text>{book.title}</Text>
            <Text>Author: {author.firstname + ' ' + author.lastname}</Text>
            {book.link &&
                <Text>Access it here: {book.link}</Text>}
            <Text>{book.blurb}</Text>
            <Text>{genreName}</Text>
            <Text>Page count: {book.page_count}</Text>
            <Text>Average rating: {book.rating}</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                {userIsAuthor || user.role === 'admin' ?
                    <DeleteBookComponent bookid={book.id} approved={book.approved}/>
                    : <Text>My rating: TODO getRatingByUser</Text>}
                {(!book.approved && user.role === 'admin') &&
                    <ApproveBookComponent id={book.id} />}
                
            </View>
            {/*TODO <ReviewList></ReviewList>*/}
        </View>
        <Divider />
        <View>
            <Button
                title="Add Review"
                type="outline"
                onPress={()=>navigation.navigate('SubmitReview', book)}
            />
            <Button
                title="See All Reviews"
                type="outline"
                onPress={()=>navigation.navigate('Reviews', book)}
            />
            {!userIsAuthor && !toRead &&
                <Button
                    title='Add to "To Read" list'
                    type='outline'
                    onPress={() => {
                        bookService.addBookToRead(user.name, book.id);
                        setToRead(true);
                    }}
                />}
        </View>
        </>
    )
}