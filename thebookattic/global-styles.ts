import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#880022',
        borderStyle: 'solid',
        borderWidth: 3
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20
    },
    login: {
        backgroundColor: '#aaa'
    },
    bookPreviewText: {
        alignSelf: 'center'
    },
    bookPreviewImg: {
        alignSelf: 'center',
        backgroundColor: '#e3e3e3',
        width: 100,
        height: 160
    },
    h1: {
        fontSize: 32
    },
    authorPreviewImg: {
        alignSelf: 'center',
        backgroundColor: '#e3e3e3',
        width: 100,
        height: 160
    },
    dangerText: {
        color: 'red'
    }
});

export default styles;