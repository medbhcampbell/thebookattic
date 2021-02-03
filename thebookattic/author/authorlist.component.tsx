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

    useEffect(() => {
        authorService.getAllAuthors().then((authors) => {
            dispatch(getAllAuthors(authors))
        })
    }, []);

    console.log(authors);

    return (
        <View>
            {(() => {
                if (authors) {
                    if (authors[0]) {
                        return (
                            <View>
                                <Text>
                                    Authors
                                </Text>
                                {authors.map((value, index: number) => {
                                    return (
                                        <AuthorComponent
                                            key={'author-' + index}
                                            author={value}
                                        ></AuthorComponent>
                                    );
                                })}
                            </View>
                        )
                    } else {
                        return (
                            <Text>
                                Loading...
                            </Text>
                        )
                    }
                } else {
                    return (
                        <Text>
                            Loading...
                        </Text>
                    )
                }
            })()}
        </View>
    )
}