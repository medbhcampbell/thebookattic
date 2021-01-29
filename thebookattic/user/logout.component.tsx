import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/actions";
import { UserState } from '../store/store';
import { User } from "./user";
import userService from "./user.service";
import style from '../global-styles';
import { Button, View } from "react-native";


export  function LogoutComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const loggedUser = user.name;
    function logout() {
      userService.logout().then(() => {
        dispatch(getUser(new User()));
      });
    }

    return(
        
        <View style={[style.container, style.login]}>
           <Button onPress={logout} title='Logout' color='#880022' />       
        </View>
   
    )

}
export default LogoutComponent;