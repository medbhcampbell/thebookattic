import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';
import {Text} from 'react-native-elements';

function ErrorBoundaryScreen(props: { error: Error}) {
    const nav = useNavigation();

    return (
        <View>
            <Text>
                Uh oh, something went horribly wrong...
            </Text>
            <Button
                title='Return to Home'
                onPress={()=>nav.navigate('Home')}/>
        </View>
    )
}

export default ErrorBoundaryScreen;