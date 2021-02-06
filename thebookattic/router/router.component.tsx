import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { UserState } from '../store/store';
import LoginComponent from '../user/login.component';
import RegisterComponent from '../user/register.component';
import HomeComponent from '../home.component';
import BookDetailComponent from '../book/bookdetail.component';
import ToReadBooksComponent from '../book/toreadbooks.component';
import HaveReadBooksComponent from '../book/havereadbooks.component';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import NavBarComponent from './navbar.component';
import AdminComponent from './admin.component';
import { Icon, Text } from 'react-native-elements';
import UnapprovedBooksComponent from '../book/unapprovedbooks.component';
import SubmitBookComponent from '../book/submitbook.component';
import UnapprovedReviewsComponent from '../review/unapprovedreviews.component';
import { Book } from '../book/book';
import { Author } from '../author/author';
import AuthorDetailComponent from '../author/authordetail.component';
import BookRecListComponent from '../book/bookRecList.component';


export type StackParams = {
    Login: undefined;
    Register: undefined;
    Logout: undefined;
    Home: undefined;
    BookDetail: Book;
    AuthorList: Author[];
    AuthorDetail: Author;
    SubmitBook: undefined;
    ToRead: undefined;
    HaveRead: undefined;
    UnapprovedBooks: undefined;
    UnapprovedReviews: undefined;
};

const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>The Book Attic {"\n"}    - a reader's guide</Text>,
    headerRight: () => <NavBarComponent />
};

const AuthStack = createStackNavigator();
export default function Authentication() {
    const user = useSelector((state: UserState) => state.user);
    return (
        <AuthStack.Navigator>
            {user.role ? (
                <AuthStack.Screen
                    name="Bottom"
                    component={BottomTab}
                    options={{
                        headerShown: false
                    }}
                />
            ) : (
                    <>
                        <AuthStack.Screen
                            name="Login"
                            component={LoginComponent}
                            options={headerOptions}
                        />
                        <AuthStack.Screen
                            name="Register"
                            component={RegisterComponent}
                            options={headerOptions}
                        />
                    </>
                )}
        </AuthStack.Navigator>
    );
}
const HStack = createStackNavigator();
function HomeStack() {
    return (
        <HStack.Navigator>
            <HStack.Screen
                name="AllBooks"
                component={HomeComponent}
                options={headerOptions}
            />
            <HStack.Screen
                name="BookDetail"
                component={BookDetailComponent}
                options={headerOptions}
            />
            <HStack.Screen
                name="AuthorDetail"
                component={AuthorDetailComponent}
                options={headerOptions}
            />
        </HStack.Navigator>
    );
}

const RStack = createStackNavigator();
function RecommendationStack() {
    return (
        <RStack.Navigator>
            <HStack.Screen
                name="Recommendation"
                component={BookRecListComponent}
                options={headerOptions}
            />
            <RStack.Screen
                name="BookDetail"
                component={BookDetailComponent}
                options={headerOptions}
            />
            <RStack.Screen
                name="AuthorDetail"
                component={AuthorDetailComponent}
                options={headerOptions}
            />
        </RStack.Navigator>
    );
}

const TRStack = createStackNavigator();
function ToReadStack() {
    return (
        <TRStack.Navigator>
            <TRStack.Screen
                name="ToReadBooks"
                component={ToReadBooksComponent}
                options={headerOptions}
            />
            <TRStack.Screen
                name="BookDetail"
                component={BookDetailComponent}
                options={headerOptions}
            />
            <TRStack.Screen
                name="AuthorDetail"
                component={AuthorDetailComponent}
                options={headerOptions}
            />
        </TRStack.Navigator>
    );
}
const HRStack = createStackNavigator();
function HaveReadStack() {
    return (
        <HRStack.Navigator>
            <HRStack.Screen
                name="HaveReadBooks"
                component={HaveReadBooksComponent}
                options={headerOptions}
            />
            <HRStack.Screen
                name="BookDetail"
                component={BookDetailComponent}
                options={headerOptions}
            />
            <HRStack.Screen
                name="AuthorDetail"
                component={AuthorDetailComponent}
                options={headerOptions}
            />
        </HRStack.Navigator>
    );
}
const AAStack = createStackNavigator();
function AdminAuthorStack() {
    const user = useSelector((state: UserState) => state.user);
    return (
        <AAStack.Navigator>
            {user.role == 'admin' ? (
                <>
                    <AAStack.Screen
                        name="Admin"
                        component={AdminComponent}
                        options={headerOptions}
                    />
                    <AAStack.Screen
                        name="UnapprovedBooks"
                        component={UnapprovedBooksComponent}
                        options={headerOptions}
                    />
                    <AAStack.Screen
                        name="UnapprovedReviews"
                        component={UnapprovedReviewsComponent}
                        options={headerOptions}
                    />
                    <AAStack.Screen
                        name="BookDetail"
                        component={BookDetailComponent}
                        options={headerOptions}
                    />
                    <AAStack.Screen
                        name="AuthorDetail"
                        component={AuthorDetailComponent}
                        options={headerOptions}
                    />
                </>

            ) : (
                    <AAStack.Screen
                        name="SubmitBook"
                        component={SubmitBookComponent}
                        options={headerOptions}
                    />
                )}

        </AAStack.Navigator>
    );
}
const Tab = createBottomTabNavigator();
function BottomTab() {
    const user = useSelector((state: UserState) => state.user);
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Icon
                            name='home'
                            type='font-awesome'
                        />
                    )
                }}
            />
            <Tab.Screen
                name="RecStack"
                component={RecommendationStack}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Recommendations',
                    tabBarIcon: () => (
                        <Icon
                            name='thumbs-up'
                            type='font-awesome-5'
                        />
                    )
                }}
            />
            <Tab.Screen
                name="ToRead"
                component={ToReadStack}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'To Read',
                    tabBarIcon: () => (
                        <Icon
                            name='bookmark'
                            type='font-awesome'
                        />
                    )
                }}
            />
            <Tab.Screen
                name="HaveRead"
                component={HaveReadStack}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Have Read',
                    tabBarIcon: () => (
                        <Icon
                            name='book'
                            type='font-awesome'
                        />
                    )
                }}
            />
            {user.role != 'user' && (
                <Tab.Screen
                    name="AdminAuthor"
                    component={AdminAuthorStack}
                    options={{
                        unmountOnBlur: true,
                        tabBarLabel: 'Functionality',
                        tabBarIcon: () => (
                            <Icon
                                name='wrench'
                                type='font-awesome'
                            />
                        )
                    }}
                />
            )}
        </Tab.Navigator>
    );
}