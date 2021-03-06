import React, { useEffect, useState } from 'react';
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

    const [validInput, setValidInput] = useState(false);

    const pickRole = (itemValue: React.ReactText) => {
        setRole(itemValue as string);
        dispatch(loginAction({ ...user, role: role }));
        checkInput();
    }

    //validate input
    const checkInput = () => {
        if (!user.role) {
            dispatch(loginAction({ ...user, role: 'user' }));
        }

        if ((user.name && user.password) &&
            ((role === 'author' && author.firstname && author.lastname && author.bio) ||
            role === 'user')) {
            setValidInput(true);
        } else {
            setValidInput(false);
        }
    }

    function registerForm() {
        user.role = role;

        userService.addUser(user).then((userres) => {
            console.log(userres);

            if (role === 'author') {
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

    useEffect(() => {
        checkInput();
    }, [user]);

    return (
        <View style={style.container}>
            <Input
                label='Username (no spaces)'
                onChangeText={(value) => {
                    dispatch(loginAction({ ...user, name: value }));
                    tempAuthor.userid = value;
                    setAuthor(tempAuthor);
                }}
                placeholder='username'
                leftIcon={{
                    type: 'font-awesome-5',
                    name: 'user-alt'
                }}
            />
            <Input
                label='Password'
                secureTextEntry={true}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, password: value }))
                }
                placeholder='password'
                leftIcon={{
                    type: 'font-awesome-5',
                    name: 'key'
                }}
            />
            <Picker
                selectedValue={role}
                style={{ height: 50, width: 100 }}
                onValueChange={pickRole}>
                {roles.map((pickerrole) => {
                    return <Picker.Item
                        key={pickerrole}
                        label={pickerrole}
                        value={pickerrole} />
                })}
            </Picker>
            {role === 'author' &&
                <>
                    <Input
                        label='First name'
                        onChangeText={(value) => {
                            tempAuthor.firstname = value;
                            setAuthor(tempAuthor);
                            checkInput();
                        }}
                    />
                    <Input
                        label='Last name'
                        onChangeText={(value) => {
                            tempAuthor.lastname = value;
                            setAuthor(tempAuthor);
                            checkInput();
                        }}
                    />
                    <Input
                        label='Tell us about yourself'
                        multiline
                        numberOfLines={2}
                        scrollEnabled
                        spellCheck={true}
                        onChangeText={(value) => {
                            tempAuthor.bio = value;
                            setAuthor(tempAuthor);
                            checkInput();
                        }}
                    />
                    <Input
                        label='Link to your photo/logo'
                        defaultValue='(optional url)'
                        onChangeText={(value) => {
                            tempAuthor.picture = value;
                            setAuthor(tempAuthor);
                            checkInput();
                        }}
                    />
                </>}
            <Button disabled={!validInput} onPress={registerForm} title='Register' type='outline' />
        </View>
    )
}


export default RegisterComponent;


