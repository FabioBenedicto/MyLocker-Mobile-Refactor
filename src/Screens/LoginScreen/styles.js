import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%',

    },
    imageContainer: {
        marginTop: getStatusBarHeight() + 1020,
        width: '100%',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        color: '#000000',
        fontSize: 30,
        fontFamily: 'Roboto-Regular',
    },
    subtitle: {
        color: '#666666',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    main: {
        width: '100%',
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        width: '100%',
        height: 75,
        borderRadius: 10,
        padding: 23,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,

        fontSize: 20,

        shadowColor: '#000',
        elevation: 5,
    },
    inputDisable: {
        backgroundColor: '#eeeeee',
        color: '#7d7b7b',
    },
    linkContainer: {
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    linkText: {
        color: '#0085FF',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: '5%',
    },
});

export default styles;
