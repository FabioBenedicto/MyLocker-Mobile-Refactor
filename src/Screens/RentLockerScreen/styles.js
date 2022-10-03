import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        width: '100%',
        marginTop: 40,
        marginBottom: 40,
        paddingHorizontal: '5%',
    },

    colorContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    lockerImage: {
        aspectRatio: 1,
        height: 200,
        width: 'auto',

        alignSelf: 'center',
    },

    flatData: {
        marginBottom: 20,
    },

    line: {
        marginRight: 27,
        marginBottom: 20,
        height: 2,

    },

    flatlist: {
        width: '100%',
        padding: '5%',
    },

    lockerImageL: {
        aspectRatio: 0.6,
        height: 100,
        width: 'auto',
        borderRadius: 7.5,

        alignContent: 'space-between',
    },

    flatDataL: {
        marginBottom: 20,
    },

    row: {
        // flex: 1,
        justifyContent: 'space-evenly',
    },

    navLockers: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default styles;
