import React from 'react';
import { View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../store/store';
import style from '../global-styles';
import userService from './user.service';
import { User } from './user';
import { useNavigation } from '@react-navigation/native';
import { loginAction } from '../store/actions';
import { Input, Button } from 'react-native-elements';


  
function RegisterComponent() {
    const userSelector = (state: UserState) => state.loginUser;
    const actualUser = useSelector((state: UserState) => state.user);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const loggedUser = user.name;

 

function registerForm() {
        userService.addUser(user).then((user) => {
           console.log(user);
           dispatch(loginAction(new User()));
           navigation.navigate('Login');
        });
    }

 

    return (
        <View style={style.container}>
        <Input
            label='Name'
            onChangeText={(value) =>
                dispatch(loginAction({ ...user, name: value }))
            }
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
                dispatch(loginAction({...user, password:value}))
            }
            placeholder='password'
                leftIcon={{
                    type: 'font-awesome-5',
                    name: 'key'
                }}
        />
        <Input
            label='Role'
            placeholder="user/admin/author"
            onChangeText={(value) =>
                dispatch(loginAction({ ...user, role:value}))
            }
              
        />

            <Button onPress={registerForm} title='Register' type='outline'/>    
        </View>
    )
            
}

export default RegisterComponent;


