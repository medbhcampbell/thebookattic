import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { changeBooks } from '../store/actions';
import bookService from './book.service';


interface DeleteBookProps {
    bookid: number;
    approved: boolean;
}

export default function DeleteBookComponent(props: DeleteBookProps) {
    const nav = useNavigation();
    const dispatch = useDispatch();

    //Delete the book and update the books kept in the store
    function deleteBook() {
        bookService.deleteBookById(props.bookid).then(() => {
            bookService.getAllBooks().then((allBooks) => {
                dispatch(changeBooks(allBooks));
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            //take us home
            nav.navigate('Home');
        })
    }

    return (
        <Button
            buttonStyle={{ backgroundColor: 'red' }}
            icon={
                <Icon
                    name='times'
                    color='white'
                    type='font-awesome'
                />
            }
            onPress={deleteBook} />
    )
}