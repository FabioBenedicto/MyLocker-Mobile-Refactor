import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DEFAULT from '../theme/default';
import THEME from '../theme/light';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
    },
    fullWidth: {
        width: '100%',
    },
    spacingTop: {
        marginTop: 40,
    },
    spacingBottom: {
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: '4%',
        marginBottom: 40,
    },
    buttonContent: {
        height: 30,
    },
    textButton: {
        color: DEFAULT.COLORS.WHITE,
        fontSize: 25,
        fontFamily: DEFAULT.FONT_FAMILY.BOLD,
    },
});

export default globalStyles;
