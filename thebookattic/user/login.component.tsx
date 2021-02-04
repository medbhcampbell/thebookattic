import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../store/actions';
import {  View } from 'react-native';
import style from '../global-styles';
import { Button, Divider, Icon, Input, Text } from 'react-native-elements';
import styles from '../global-styles';



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
        }
    }, []);

   
    function submitForm() {
        userService.login(login).then((user) => {
            if(user){
                dispatch(getUser(user));  
            }
        }).catch(err=>{
            console.log(err);
        });
    }

  

     return (
        <View style={style.container}>
            <Input
                label='Username'
                onChangeText={(value) =>
                    dispatch(loginAction({ ...login, name: value }))
                }
                value={login.name}
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
                    dispatch(loginAction({ ...login, password: value }))
                }
                value={login.password}
                placeholder='password'
                leftIcon={{
                    type: 'font-awesome-5',
                    name: 'key'
                }}
            />
           
            <Button type='outline' onPress={submitForm} title='Login' />
            <Button
                type='clear'
                onPress={() => {
                    navigation.navigate('Register');
                }}
                title='Register'
            />

        </View>
    );
}

export default LoginComponent;
