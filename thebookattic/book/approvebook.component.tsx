import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { changeBooks } from '../store/actions';
import bookService from './book.service';
import style from '../global-styles';

interface ApproveBookProps {
    id: number;
}

export default function ApproveBookComponent(props: ApproveBookProps) {
    const nav = useNavigation();
    const dispatch = useDispatch();

    //Delete the book and update the books kept in the store
    function approveBook() {
        bookService.approveBookById(props.id).then(() => {
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
            color='green'
            title='Approve'
            onPress={approveBook} />
    )
}