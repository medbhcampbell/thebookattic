import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View } from 'react-native';
import style from '../global-styles';


// Function Component
interface LoginProp {
    navigation: any
}
function LoginComponent({navigation}: LoginProp) {
    const userSelector = (state: UserState) => state.loginUser;
    const login = useSelector(userSelector);
    const actualUser = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Check to see if we're already logged in. Redirect if we are.
        console.log(actualUser);
        if(actualUser.role){
            console.log(actualUser);
            navigation.navigate('Home');
        }
    }, []);

    function submitForm() {
        userService.login(login).then((user) => {
            if(user){
                dispatch(getUser(user));  
                navigation.navigate('Home');
            }
        }).catch(err=>{
            console.log(err);
        });
    }
    return (
        <View style={[style.container, style.login]}>
            <Text>Username: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...login, name: value }))
                }
                value={login.name}
            />
            <Text>Password: </Text>
            <TextInput
                secureTextEntry={true}
                style={style.input}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...login, password: value }))
                }
                value={login.password}
            />
            <Button onPress={submitForm} title='Login' color='#880022' />
        </View>
    );
}

export default LoginComponent;
