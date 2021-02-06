import React from 'react';
import { Button, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import style from './global-styles';
import { getUser } from './store/actions';
import { User } from './user/user';

function ErrorBoundaryScreen(props: { error: Error, resetError: Function }) {
    const dispatch = useDispatch();

    return (
        <View>
            <Text style={style.h1}>
                Oops, something went horribly wrong...
            </Text>
            <Text style={style.dangerText}>{props.error.toString()}</Text>
            <Button
                title='Return to Home'
                onPress={()=>{
                    dispatch(getUser(new User));
                    props.resetError();    
                }}/>
        </View>
    )
}

export default ErrorBoundaryScreen;