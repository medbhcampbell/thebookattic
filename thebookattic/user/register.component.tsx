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
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    

 

function registerForm() {
        userService.addUser(user).then((userres) => {
           console.log(userres);
           dispatch(loginAction(new User()));
           navigation.navigate('Login');
        });
    }

 

    return (
        <View style={style.container}>
        <Input
            label='Name'
            style={style.input}
            onChangeText={(value) =>
                dispatch(loginAction({ ...user, name: value }))
            }
            />
        <Input
            label='Password'
            style={style.input}
            secureTextEntry={true} 
            onChangeText={(value) =>
                dispatch(loginAction({...user, password:value}))
            }
            
        />
        <Input
            label='Role'
            style={style.input}
            placeholder="user/author"
            onChangeText={(value) =>
                dispatch(loginAction({ ...user, role:value}))
            }
              
        />

            <Button onPress={registerForm} title='Register' type='outline'/>    
        </View>
    )
    
            
}


export default RegisterComponent;


