import React, { SyntheticEvent } from 'react';
import {
     StyleSheet, 
     Text, 
     View,
     TextInput,
     TouchableOpacity, 
     Button} from 'react-native';

import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { UserState } from '../store/store';
import style from '../global-styles';
import userService from './user.service';
import { changeUser } from '../store/actions';
import { User } from './user';
import { useNavigation } from '@react-navigation/native';


const userProp = (state: UserState) => ({
    user: state.user,
  });
const mapDispatch = {
    updateUser: (user: User) =>
      changeUser(user),
  };

  const connector = connect(userProp, mapDispatch);

  type PropsFromRedux = ConnectedProps<typeof connector>;

function RegisterComponent(props: PropsFromRedux) {
    const userSelector = (state: UserState) => state.loginUser;
    const actualUser = useSelector((state: UserState) => state.user);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();

function handleForm(){
    
  }

 

function registerForm() {
        userService.addUser(props.user).then((user) => {
            console.log(user);
            dispatch(changeUser(new User()));
            navigation.navigate('login');
        });
    }

    return (
        <View>
        <Text>Name</Text><br/>
        <TextInput onChange={handleForm} style={style.input} placeholder="Your name" /><br/>
        <Text>Password</Text><br/>
        <TextInput onChange={handleForm} style={style.input} secureTextEntry={true} placeholder="Password"/><br/>
        <Text>Role</Text><br/>
        <TextInput onChange={handleForm} style={style.input} placeholder="user/admin/author"/><br/>
        

            <Button onPress={registerForm} title='Register' color='#880022' />    
        </View>
    )
}

export default connector(RegisterComponent);


