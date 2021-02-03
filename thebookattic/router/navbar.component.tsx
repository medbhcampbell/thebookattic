import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';

import style from '../global-styles';
import { BookAtticState } from '../store/store';
import LogoutComponent from '../user/logout.component';

function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: BookAtticState) => state.user);
    return (
        <View style={style.userNavBar}>
            {user.name && <Button title='Recommended' onPress={() => nav.navigate('BookRecList')} />}
            {user.name && <Button title='To Read' onPress={() => nav.navigate('ToRead')} />}
            {user.name && <Button title='Have Read' onPress={() => nav.navigate('HaveRead')} />}
            {user.role === 'author' && <Button title='Submit Book' onPress={() => nav.navigate('SubmitBook')} />}
        <View>
            {user.name ? 
                <View style={style.userNavBar}>
                    <LogoutComponent/>
                    <Text>Welcome, {user.name}</Text>
                </View> : 
                <View style={style.userNavBar}> 
                    <Button
                        onPress={() => {
                            nav.navigate('Register');
                        }}title='Register' color='#880022'
                    />
                </View>
            }
        </View>
        </View>
    )
    
}

export default NavBarComponent;