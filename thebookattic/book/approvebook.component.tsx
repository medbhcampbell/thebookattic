import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { changeBooks } from '../store/actions';
import bookService from './book.service';


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
            }).finally(() => {
                // Return to unapproved books
                nav.navigate('UnapprovedBooks');
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Button
            buttonStyle={{backgroundColor: 'green'}}
            icon={
                <Icon
                    name='check'
                    color='white'
                    type='font-awesome'
                />
            }
            onPress={approveBook} />
    )
}