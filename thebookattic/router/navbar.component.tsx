import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { BookAtticState } from '../store/store';




function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: BookAtticState) => state.user);
    return (
        <View >
           {user.name && <Text>Welcome User you are here {user.name} </Text>}
           
                <Button
                    onPress={() => {
                        nav.navigate('Register');
                    }}title='Register' color='#880022'
                    
                />
                         
        </View>
    )
}

export default NavBarComponent;