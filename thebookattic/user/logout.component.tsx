import React from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import style from '../global-styles';
import { getUser } from "../store/actions";
import { User } from "./user";
import { Button, Icon } from "react-native-elements";


export  function LogoutComponent() {
    const dispatch = useDispatch();
    function logout() {
        dispatch(getUser(new User()));
    }

    
   

    return(
        <View style={style.container}  >
            
           <Button  
           buttonStyle={{backgroundColor: 'clear'} }
           
           icon={
               <><Icon
                   name='sign-out-alt'
                   type='font-awesome-5' />
                   <Text>Logout</Text></>
           }
          
           onPress={logout} 
              />
        </View>
    )

}
export default LogoutComponent;