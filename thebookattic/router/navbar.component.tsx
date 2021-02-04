import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { BookAtticState } from "../store/store";
import LogoutComponent from "../user/logout.component";

function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: BookAtticState) => state.user);
    return (
        <View>
            {user.name && 
                <View>
                    <Text>Welcome, {user.name}</Text>
                    <LogoutComponent/>
                </View> 
            }
        </View>
    )
}

export default NavBarComponent;