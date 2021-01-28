import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { AuthorState } from '../store/store';
import { getAuthor } from '../store/actions';
import { Author } from './author';
import authorService from './author.service';

export default function AuthorDetailComponent() {
    const selectAuthor = (state: AuthorState) => state.author;
    const author = useSelector(selectAuthor);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     authorService.getAuthorById(1).then((author) => {
    //         dispatch(getAuthor(author));
    //     })
    // }, [dispatch]);

    console.log('AuthorDetailComponent: ' + JSON.stringify(author));
    let newAuthor = new Author();
    newAuthor.authorid = 9;
    newAuthor.userid = 111116;
    newAuthor.firstname = 'Joe';
    newAuthor.lastname = 'Author';
    newAuthor.avgrating = 3.7;
    newAuthor.bio = 'bio';
    newAuthor.picture = 'url';

    let updatedAuthor = new Author();
    updatedAuthor.authorid = 1;
    updatedAuthor.userid = 111111;
    updatedAuthor.firstname = 'Jake';
    updatedAuthor.lastname = 'Austin';
    updatedAuthor.avgrating = 5.0;
    updatedAuthor.bio = 'Very English';
    updatedAuthor.picture = 'url';

    console.log(newAuthor);
    console.log(updatedAuthor);
    
    function onAddSelect() {
        authorService.addAuthor(newAuthor);
    }

    function onUpdateSelect() {
        authorService.updateAuthor(updatedAuthor);
    }

    function onRemoveSelect() {
        authorService.removeAuthor('6');
    }

    function onGetAuthorSelect() {
        let a: any = { ...author };
        authorService.getAuthorById(1).then((author) => {
            a = author;
        });
        console.log(a.firstName + ' ' + a.lastname);
    }

    return (
        <View>
            <Text>
                This is a placeholder. I am not quite 100% finished with this. You can probably see that.
            </Text>
            <Text>Author's Name : {author.firstname + ' ' + author.lastname}</Text>
            <Text>Average rating for the author : {author.avgrating}</Text>
            <Text>Author's bio goes here : {author.bio}</Text>
            <View>
                <Text>
                    This is the section where books by this author will be displayed
                </Text>
            </View>
            <br/>
            <Pressable onPress={()=> onAddSelect()}>
                Test addAuthor
            </Pressable>
            <br/>
            <Pressable onPress={()=> onUpdateSelect()}>
                Test updateAuthor
            </Pressable>
            <br/>
            <Pressable onPress={()=> onRemoveSelect()}>
                Test removeAuthor
            </Pressable>
            <br/>
            <Pressable onPress={()=> onGetAuthorSelect()}>
                Test getAuthorById
            </Pressable>
            <br/>
        </View>
    )
}