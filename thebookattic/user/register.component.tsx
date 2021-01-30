import React from 'react';
import {
     Text, 
     View,
     TextInput,
     Button} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../store/store';
import style from '../global-styles';
import userService from './user.service';
import { User } from './user';
import { useNavigation } from '@react-navigation/native';
import { loginAction } from '../store/actions';


  
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
        <View style={[style.container, style.login]}>
        <Text>Name</Text><br/>
        <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, name: value }))
                }
                
            /> <br/>
        <Text>Password</Text><br/>
        <TextInput
                style={style.input}
                secureTextEntry={true} 
                onChangeText={(value) =>
                    dispatch(loginAction({...user, password:value}))
                }
                
            /> <br/>
        <Text>Role</Text><br/>
        <TextInput
                style={style.input}
                placeholder="user/admin/author"
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, role:value}))
                }
              
            /> <br/>

            <Button onPress={registerForm} title='Register' color='#880022' />    
        </View>
    )
            
}

export default RegisterComponent;


