import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AllBooksComponent from './book/allbooks.component';
import style from './global-styles';
import { UserState } from './store/store';

export default function HomeComponent() {
    const nav = useNavigation();
    const user = useSelector((state: UserState) => state.user);

    function viewNeedApproval() {
        nav.navigate('UnapprovedBooks');
    }

    return (
        <View>
            {/* TODO: Put other stuff here, links, reccomendations, to-read list, etc (maybe move allbooks to a separate page)*/}
            {/*user.role === 'admin' && */
                <Card>
                    <View style={style.approvalNotice}>
                        <Text style={style.dangerText}>There are some books that need approval!</Text>
                        <Button title='View' color='red' onPress={viewNeedApproval}/>
                    </View>
                </Card>}
            <AllBooksComponent/>
        </View>
    )
}