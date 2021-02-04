import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import store from './store/store';
// import RouterComponent from './unusedComponents/router.component';
import Authentication from './router/router.component';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Authentication />
            </NavigationContainer>
        </Provider>
    );
}
