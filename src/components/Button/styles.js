import { StyleSheet } from 'react-native';
import DEFAULT from '../../theme/default';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 15,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer:{
        height: 30, 
        justifyContent: 'center',
    },
    text:{
        color: DEFAULT.COLORS.WHITE,
        fontSize: 25,
        fontFamily: DEFAULT.FONT_FAMILY.BOLD,
    },
    inputDisable: {
        backgroundColor: DEFAULT.COLORS.GRAY.DARK,
    },
});

export default styles;
