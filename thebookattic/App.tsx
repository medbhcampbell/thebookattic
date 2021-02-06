import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';

import store from './store/store';
import Authentication from './router/router.component';
import ErrorBoundaryScreen from './errorBoundaryScreen.component';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
                   <Authentication /> 
                </ErrorBoundary>
            </NavigationContainer>
        </Provider>
    );
}
