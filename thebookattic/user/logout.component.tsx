import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import style from '../global-styles';
import { getUser } from "../store/actions";
import { User } from "./user";
import { Button } from "react-native-elements";


export  function LogoutComponent() {
    const dispatch = useDispatch();
    function logout() {
        dispatch(getUser(new User()));
    }

    return(
        <View style={style.container}>
           <Button onPress={logout} title='Logout' type='clear' />       
        </View>
    )

}
export default LogoutComponent;