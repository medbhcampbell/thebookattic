import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeBooks } from '../store/actions';
import bookService from './book.service';
import style from '../global-styles';

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
            color='red'
            title={props.approved? 'Delete':'Reject'}
            onPress={deleteBook} />
    )
}