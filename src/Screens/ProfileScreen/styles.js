import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    container2: {
        flex: 1,
    },

    // header

    header: {
        height: 120,
        alignContent: 'flex-end',
    },

    user: {
        transform: [{ translateY: (height / 100) * 11 }],
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: (height / 100) * 2.5,
        right: (height / 100) * 1,
    },

    textContainer: {
        flex: 1,
        marginLeft: (height / 100) * 1,
        transform: [{ translateY: (height / 100) * 4.5 }/* , { translateX: (height / 100) * 1 } */],
    },

    firstName: {
        fontSize: 30,
        color: '#000000',
        alignSelf: 'center',
        fontFamily: 'Roboto-Regular',
    },

    lastName: {
        fontSize: 20,
        color: '#989898',
        alignSelf: 'center',
        fontFamily: 'Roboto-Regular',
    },

    imageU: {
        width: 110,
        height: 110,
        borderRadius: 55,
    },

    imageU2: {
        width: 22,
        height: 23,
        position: 'absolute',
        top: 10,
        right: 20,
        transform: [{ translateY: (height / 100) * 2.5 }],
    },

    // body

    body: {
        flex: 4,
        padding: '5%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    yourLocker: {
        transform: [{ translateY: (height / 100) * 12.3 }],
    },

    title: {
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
    },

    nolockerContainer: {
        alignSelf: 'center',
        marginTop: 40,
    },

    colorContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    /* lockerContainer: {
        alignSelf: 'center',
        backgroundColor: '#F2F2F2',
        width: '100%',
        marginTop: 35,
        borderRadius: 10,
    }, */

    text: {
        color: 'gray',
        // fontSize: 16,
        fontSize: (height / 100) * 2.7,
        fontWeight: '500',
        alignSelf: 'center',
        marginTop: (height / 100) * 0.8,
    },

    lockerContainer: {
        width: '100%',
        marginTop: 30,
        backgroundColor: '#F6F6F6',
        borderRadius: 25,
        padding: 30,
    },
    smallTitle: {
        fontSize: 30,
        fontFamily: 'Roboto-Regular',
    },

    smallSubtitle: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    lockerContainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallTextContainer: {
        height: '100%',
    },
    lockerImageContainer: {
        borderRadius: 5,
        width: 45,
        marginRight: 20,
    },

});

export default styles;
