import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        color: '#FF0000'
    },
    approvalNotice: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    userNavBar: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    bookDetailContainer: {
        display: 'flex',
        marginHorizontal: 'auto',
        marginVertical: '4%',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: '3%'
    }
});

export default styles;
