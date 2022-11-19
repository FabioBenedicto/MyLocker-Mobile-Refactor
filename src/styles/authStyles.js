import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DEFAULT from '../theme/default';

const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: 150,
        width: '100%',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        color: DEFAULT.COLORS.BLACK,
        fontSize: DEFAULT.FONT_SIZE.LG,
        fontFamily: DEFAULT.FONT_FAMILY.REGULAR,
    },
    subtitle: {
        color: DEFAULT.COLORS.GRAY.MEDIUM,
        fontSize: DEFAULT.FONT_SIZE.MD,
        fontFamily: DEFAULT.FONT_FAMILY.REGULAR,
    },
    linkContainer: {
        alignSelf: 'flex-start',
        marginLeft: 8,
    },
    linkText: {
        color: DEFAULT.COLORS.BLUE.MEDIUM,
        fontSize: DEFAULT.FONT_SIZE.MD,
        fontFamily: DEFAULT.FONT_FAMILY.REGULAR,
    },
    input: {
        width: '100%',
        height: 75,
        borderRadius: 10,
        padding: 23,
        backgroundColor: DEFAULT.COLORS.WHITE,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        fontSize: DEFAULT.FONT_SIZE.MD,
        fontFamily: DEFAULT.FONT_FAMILY.REGULAR,
        ...Platform.select({
            android: {
                elevation: 6,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 6,
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
        backgroundColor: DEFAULT.COLORS.WHITE,
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
        backgroundColor: DEFAULT.COLORS.WHITE,
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: DEFAULT.FONT_SIZE.MD,
    },
});

export default authStyles;
