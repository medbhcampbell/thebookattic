import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';

import LoginComponent from '../user/login.component';
import HomeComponent from '../home.component';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;
   
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>The Book Attic</Text>,
    
};
function RouterComponent(props: any) {
    
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name='Login'
                component={LoginComponent}
                options={headerOptions}
            />
           <Stack.Screen
                name='Home'
                component={HomeComponent}
                options={headerOptions}
            />
        </Stack.Navigator>
    );
}

export default RouterComponent;
