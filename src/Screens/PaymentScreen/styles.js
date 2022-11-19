import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    spacing: {
        marginTop: 40,
    },
    textContainer: {
        marginTop: 40,
        marginBottom: 40,
    },
    lockerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 25,
        padding: 30,
        marginHorizontal: 30,
    },
    title: {

    },

    lockerHeader: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
    },
    lockerNumber: {
        fontFamily: 'Roboto-Medium',
        fontSize: 30,
        color: '#000000',
    },
    lockerPrice: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        color: '#000000',
    },
    lockerMain: {
        width: '100%',
    },
    lineInfo: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 5,
    },

    infoText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: '#000000',
    },

    colorContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    priceContainer: {
        width: '100%',
        marginTop: 40,
        marginBottom: 40,
    },

    linePrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    titlePrice: {
        fontFamily: 'Roboto-Regular',
        fontSize: 25,
        color: '#000000',
    },

    subtitlePrice: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#868686',
    },

});

export default styles;
