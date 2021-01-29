import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';

import LoginComponent from '../user/login.component';
import HomeComponent from '../home.component';
import BookDetailComponent from '../book/bookdetail.component';
import AuthorListComponent from '../author/authorlist.component';
import AuthorDetailComponent from '../author/authordetail.component';
import SubmitBookComponent from '../book/submitbook.component';
import UnapprovedBooksComponent from '../book/unapprovedbooks.component';
import { Book } from '../book/book';
import { Author } from '../author/author';
import NavBarComponent from './navbar.component';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;
    Home: undefined;
    BookDetail: Book;
    AuthorList: Author[];
    AuthorDetail: Author;
    SubmitBook: undefined;
    UnapprovedBooks: undefined;
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>The Book Attic</Text>,
    headerRight: () => <NavBarComponent />
};

function RouterComponent(props: any) {  
    return (
        <Stack.Navigator initialRouteName='Home'>
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
            <Stack.Screen
                name='AuthorList'
                component={AuthorListComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='AuthorDetail'
                component={AuthorDetailComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='SubmitBook'
                component={SubmitBookComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='UnapprovedBooks'
                component={UnapprovedBooksComponent}
                options={headerOptions}
            />
        </Stack.Navigator>
    );
}

export default RouterComponent;
