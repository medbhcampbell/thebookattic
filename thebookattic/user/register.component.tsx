import React, { useState } from 'react';
import { View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../store/store';
import style from '../global-styles';
import userService from './user.service';
import { User } from './user';
import { useNavigation } from '@react-navigation/native';
import { loginAction } from '../store/actions';
import { Input, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { Author } from '../author/author';
import authorService from '../author/author.service';

function RegisterComponent() {
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const roles = ['user', 'author'];
    const [role, setRole] = useState(roles[0]);
    const [author, setAuthor] = useState(new Author());
    let tempAuthor = author;

    const pickRole = (itemValue: React.ReactText) => {
        setRole(itemValue as string);
        dispatch(loginAction({ ...user, role: role }));
    }

    function registerForm() {
        user.role = role;
        userService.addUser(user).then((userres) => {
            console.log(userres);

            if(role === 'author') {
                authorService.addAuthor(author).then(() => {
                    console.log(`added author ${JSON.stringify(author)}`);
                }).catch((err) => {
                    console.log(err);
                });
            }

            dispatch(loginAction(new User()));
            navigation.navigate('Login');
        });
    }

    return (
        <View style={style.container}>
            <Input
                label='Username (no spaces)'
                style={style.input}
                onChangeText={(value) => {
                    dispatch(loginAction({ ...user, name: value }))
                    tempAuthor.userid = value;
                    setAuthor(tempAuthor);
                }}
            />
            <Input
                label='Password'
                style={style.input}
                secureTextEntry={true}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, password: value }))
                }
            />
            <Picker
                selectedValue={role}
                style={{ height: 50, width: 100 }}
                onValueChange={pickRole}>
                {roles.map((role) => {
                    return <Picker.Item
                        key={role}
                        label={role}
                        value={role} />
                })}
            </Picker>
            {role === 'author' &&
                <>
                    <Input
                        label='First name'
                        style={style.input}
                        onChangeText={(value) => {
                            tempAuthor.firstname = value;
                            setAuthor(tempAuthor);
                        }}
                    />
                    <Input
                        label='Last name'
                        style={style.input}
                        onChangeText={(value) => {
                            tempAuthor.lastname = value;
                            setAuthor(tempAuthor);
                        }}
                    />
                    <Input
                        label='Tell us about yourself'
                        style={style.input}
                        multiline
                        numberOfLines={2}
                        scrollEnabled
                        spellCheck={true}
                        onChangeText={(value) => {
                            tempAuthor.bio = value;
                            setAuthor(tempAuthor);
                        }}
                    />
                    <Input
                        label='Link to your photo/logo'
                        defaultValue='url'
                        style={style.input}
                        onChangeText={(value) => {
                            tempAuthor.picture = value;
                            setAuthor(tempAuthor);
                        }}
                    />
                </>}
            <Button onPress={registerForm} title='Register' type='outline' />
        </View>
    )
}


export default RegisterComponent;


