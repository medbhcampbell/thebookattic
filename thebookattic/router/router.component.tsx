import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';

import LoginComponent from '../user/login.component';
import HomeComponent from '../home.component';
import BookDetailComponent from '../book/bookdetail.component';
import { Book } from '../book/book';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;
    Home: undefined;
    BookDetail: Book;
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
            <Stack.Screen
                name='BookDetail'
                component={BookDetailComponent}
                options={headerOptions}
            />
        </Stack.Navigator>
    );
}

export default RouterComponent;
