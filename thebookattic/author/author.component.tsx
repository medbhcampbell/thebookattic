import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { getAuthor} from '../store/actions';
import { Author } from './author';
import authorService from './author.service';

interface AuthorProps {
    author: Author;
}

export default function AuthorComponent(props: AuthorProps) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    function onAuthorSelect() {
        dispatch(getAuthor(props.author));
        navigation.navigate('AuthorDetail');
    }

    console.log(props.author);

    return (
        <View>
            <Text>
                <Pressable onPress={()=> onAuthorSelect()}>
                    <Text>
                        Select
                    </Text>
                </Pressable>
                {'Name: ' + props.author.firstname + ' ' + props.author.lastname}
                {'Rating: ' + props.author.avgrating}
            </Text>
        </View>
    )
}