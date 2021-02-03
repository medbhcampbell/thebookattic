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

    function approveBook() {
        bookService.approveBookById(props.id).then(() => {
            // Refresh the store with the update book set
            bookService.getAllBooks().then((allBooks) => {
                dispatch(changeBooks(allBooks));
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            // Return to unapproved books
            nav.navigate('UnapprovedBooks');
        })
    }

    return (
        <Button
            color='green'
            title='Approve'
            onPress={approveBook} />
    )
}