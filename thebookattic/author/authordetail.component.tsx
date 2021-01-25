import React from 'react';
import { View, Text } from 'react-native';

export default function AuthorDetailComponent() {
    return (
        <View>
            <Text>
                This is a placeholder. I am not quite 100% finished with this. You can probably see that.
            </Text>
            <Text>Author's Name</Text>
            <Text>Average rating for the author</Text>
            <Text>Author's bio goes here</Text>
            <View>
                <Text>
                    This is the section where books by this author will be displayed
                </Text>
            </View>
        </View>
    )
}