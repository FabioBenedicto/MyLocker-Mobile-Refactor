import { Dimensions, Platform, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import THEME from '../theme';

const { width, height } = Dimensions.get('window');

const textSize = [(height / 100) * 2.45, (height / 100) * 2.6, (height / 100) * 4.5, (height / 100) * 3.7, (height / 100) * 2.4];

const gStyles = StyleSheet.create({

    textButton: {
        color: '#FFFFFF',
        fontSize: 25,
        fontFamily: 'Roboto-Bold',
    },

    buttonContainer: {
        width: '100%',
        paddingHorizontal: '5%',
        marginBottom: 40,
    },

    container: {
        flex: 1,
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    imageContainer: {
        marginTop: getStatusBarHeight() + 120,
        width: '100%',
        alignItems: 'center',
    },

    image: {
        resizeMode: 'contain',
        width: '100%',
    },

    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#000000',
        fontSize: 30,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
    },
    subtitle: {
        color: '#666666',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
    },
    modaTitle: {

    },
    modalSubtitle: {

    },
    body: {
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
        ...Platform.select({
            android: {
                elevation: 5,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
            },
        }),

    },
    inputArea: {
        flexDirection: 'row',
        width: '100%',
        height: 75,
        backgroundColor: '#ffffff',
        padding: 23,
        paddingRight: 0,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        elevation: 5,

    },
    passwordInput: {
        width: '85%',
        height: 75,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 20,
    },
    icon: {
        width: '15%',
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
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

    lockerInfoinput: {
        width: '100%',
        height: 50,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: 20,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        elevation: 5,
    },

    lockerInfoLabel: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: 20,
    },

    //

    background: {
        flex: 1,
        backgroundColor: 'gray',
        opacity: 0.15,
    },

    modalContainer: {
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        shadowColor: '#000',
        elevation: 50,
    },

    contentContainerAlert: {
        width: width - width / 10,

        alignSelf: 'center',

        justifyContent: 'space-between',

        // alignItems: 'center',
        padding: 20,
        bottom: width / 2 + width / 6,
        // paddingHorizontal: 40,

        backgroundColor: 'white',

        position: 'absolute',

        borderRadius: 25,
        // borderTopLeftRadius: 25,

        shadowColor: '#000',
        elevation: 50,
    },

    modalTitle: {
        marginTop: 20,
    },

    modalTextContainer: {
        marginTop: 20,
    },

    modalText: {
        color: '#000000',
    },

    smallTitle: {
        fontSize: textSize[3],
        fontWeight: '500',
    },

    smallSubtitle: {
        fontSize: textSize[4],
    },

    color: {
        width: 15,
        height: 15,
        backgroundColor: '#FF7B7B',
        borderRadius: 5,
        marginLeft: 5,
    },

    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        borderBottomStyle: 'solid',
        width: '100%',
        // marginTop: 10,
        // tirar esse margin dps
    },

    lockerInfo: {
        width: '100%',
    },

    modalLine: {
        width: 80,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        borderRadius: 2,
        marginTop: 20,
        marginBottom: 20,
    },

});

export default gStyles;
