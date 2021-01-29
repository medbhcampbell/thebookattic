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
<<<<<<< HEAD
           {user.name && <Text>Welcome User you are here {user.name} </Text>}
           
                <Button
                    onPress={() => {
                        nav.navigate('Register');
                    }}title='Register' color='#880022'
                    
                />
                         
=======
            {user.name && <Text>Welcome {user.name} </Text>}
            <Button title='Submit Book' onPress={() => nav.navigate('SubmitBook')} />
>>>>>>> f54b406e76becd19793ed093c83ff42aca471f3e
        </View>
    )
}

export default NavBarComponent;