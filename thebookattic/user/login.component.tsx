import React, { useEffect ,useState} from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../store/actions';
import { View } from 'react-native';
import style from '../global-styles';
import { Button, Input, Text } from 'react-native-elements';
import { User } from './user';
import { color } from 'react-native-reanimated';



// Function Component
interface LoginProp {
    navigation: any
    loginFailed: boolean;
}
function LoginComponent({navigation}: LoginProp) {
    const userSelector = (state: UserState) => state.loginUser;
    const login = useSelector(userSelector);
    const actualUser = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();
    const [loginFailed,setLoginFailed] = useState(false);
    
      
    
    
    useEffect(() => {
        // Check to see if we're already logged in. Redirect if we are.
        console.log(actualUser);
        if(actualUser.role){
            console.log(actualUser);
        }
    }, []);

   
    function submitForm() {
        userService.login(login).then((user) => {
            if(user){
                setLoginFailed(false);
                dispatch(getUser(user));  
            }
        }).catch(err=>{
            setLoginFailed(true);
            dispatch(getUser(new User()));
           });
    }

  
    
     return (
        <View style={style.container}>
            <Input 
                label='Username'
                onChangeText={(value) =>
                    dispatch(loginAction({ ...login, name: value }))
                }
                value={login.name}
                placeholder='username'
                leftIcon={{
                    type: 'font-awesome-5',
                    name: 'user-alt'
                }}
            />
            
            <Input 
                label='Password'
                secureTextEntry={true}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...login, password: value }))
                }
                
                
                value={login.password}
                placeholder='password'
                leftIcon={{
                    type: 'font-awesome-5',
                    name: 'key'
                }}
            />

            {(loginFailed === true) &&
             <Text style={style.dangerText}>Login Failed: Incorrect UserName or Password!</Text>
             }
           
            <Button type='outline' onPress={submitForm} title='Login' />
            <Button
                type='clear'
                onPress={() => {
                    navigation.navigate('Register');
                }}
                title='Register'
            />

        </View>
    ); 

            }
        


export default LoginComponent;
