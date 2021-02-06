import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { changeBooks } from '../store/actions';
import bookService from './book.service';


interface DeleteBookProps {
    bookid: number;
}

export default function DeleteBookComponent(props: DeleteBookProps) {
    const nav = useNavigation();
    const dispatch = useDispatch();

    //Delete the book and update the books kept in the store
    function deleteBook() {
        console.log(`deleting book ${props.bookid}`);
        bookService.deleteBookById(props.bookid).then(() => {
            console.log('deleted');
            bookService.getAllBooks().then((allBooks) => {
                console.log('updating store');
                dispatch(changeBooks(allBooks));
            }).catch((err) => {
                console.log(err);
            }).finally(()=> {
                nav.goBack();
            });
        }).catch((err) => {
            console.log(err);
        });
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