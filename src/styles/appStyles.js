import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DEFAULT from '../theme/default';

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        color: DEFAULT.COLORS.BLACK,
        fontSize: DEFAULT.FONT_SIZE.LG,
        fontFamily: DEFAULT.FONT_FAMILY.MEDIUM,
    },
    subtitle: {
        color: DEFAULT.COLORS.GRAY.MEDIUM,
        fontSize: DEFAULT.FONT_SIZE.MD,
        fontFamily: DEFAULT.FONT_FAMILY.REGULAR,
    },
});

export default appStyles;
