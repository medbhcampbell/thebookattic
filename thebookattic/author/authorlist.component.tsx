import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';

import { getAllAuthors } from '../store/actions';
import { AuthorState } from '../store/store';
import authorService from './author.service';
import AuthorComponent from './author.component';

export default function AuthorListComponent() {
    const selectAuthors = (state: AuthorState) => state.authors;
    const authors = useSelector(selectAuthors);
    const dispatch: any = useDispatch();

    console.log(authors);

    return (
        <View>
            <Text>
                This is where the author list may/will go. It may/will be awesome.
                {authors.map((value, index: number) => {
                        return (
                            <AuthorComponent
                                key={'author-' + index}
                                author={value}
                            ></AuthorComponent>
                        );
                    })}
            </Text>
        </View>
    )
}