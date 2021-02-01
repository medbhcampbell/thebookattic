import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector,useDispatch } from 'react-redux';

import style from '../global-styles';
import { BookAtticState } from '../store/store';
import userService from '../user/user.service';
import LogoutComponent from '../user/logout.component';

function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: BookAtticState) => state.user);
    return (
        <View>
            {user.name && 
                <View style={style.userNavBar}>
                    <LogoutComponent/>
                    <Text>Welcome, {user.name}</Text>
                </View>}
        </View>
    )
}

export default NavBarComponent;