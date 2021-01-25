import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import store from './store/store';
import RouterComponent from './router/router.component';

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
            <RouterComponent></RouterComponent>
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
