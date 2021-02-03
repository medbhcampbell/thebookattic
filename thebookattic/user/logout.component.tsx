import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import style from '../global-styles';
import { UserState } from '../store/store';
import { getUser } from "../store/actions";
import { User } from "./user";
import { Button } from "react-native-elements";


export  function LogoutComponent() {
    const navigation = useNavigation();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    function logout() {
        dispatch(getUser(new User()));
        navigation.navigate('Login');
    }

    return(
        <View style={style.container}>
           <Button onPress={logout} title='Logout' type='clear' />       
        </View>
    )

}
export default LogoutComponent;