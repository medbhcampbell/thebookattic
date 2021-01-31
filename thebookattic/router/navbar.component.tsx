import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import { BookAtticState } from '../store/store';
import userService from '../user/user.service';




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
                
                                         
            {user.name && <Text>Welcome {user.name} </Text>}
            {user.name && <Button title='To Read' onPress={() => nav.navigate('ToRead')} />}
            {user.role === 'author' && <Button title='Submit Book' onPress={() => nav.navigate('SubmitBook')} />}
        </View>
    )
}

export default NavBarComponent;