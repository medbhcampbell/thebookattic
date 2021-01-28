import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { BookAtticState } from '../store/store';
import styles from '../global-styles';

function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: BookAtticState) => state.user);
    return (
        <View >
            {user.name && <Text>Welcome {user.name} </Text>}
            <Button title='Submit Book' onPress={() => nav.navigate('SubmitBook')} />
        </View>
    )
}

export default NavBarComponent;