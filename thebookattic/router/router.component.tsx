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
import ToReadBooksComponent from '../book/toreadbooks.component';
import RegisterComponent from '../user/register.component';
import LogoutComponent from '../user/logout.component';
import UnapprovedReviewsComponent from '../review/unapprovedreviews.component';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;
    Register: undefined;
    Logout : undefined;
    Home: undefined;
    BookDetail: Book;
    AuthorList: Author[];
    AuthorDetail: Author;
    SubmitBook: undefined;
    ToRead: undefined;
    UnapprovedBooks: undefined;
    UnapprovedReviews :undefined;
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>The Book Attic</Text>,
    headerRight: () => <NavBarComponent />
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
                name='Register'
                component={RegisterComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Logout'
                component={LogoutComponent}
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
                name='ToRead'
                component={ToReadBooksComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='UnapprovedBooks'
                component={UnapprovedBooksComponent}
                options={headerOptions}
            />
             <Stack.Screen
                name='UnapprovedReviews'
                component={UnapprovedReviewsComponent}
                options={headerOptions}
            />
        </Stack.Navigator>
    );
}

export default RouterComponent;
