import { StyleSheet } from 'react-native';
import DEFAULT from '../../theme/default';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0085FF',
        width: '100%',
        borderRadius: 15,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputDisable: {
        backgroundColor: DEFAULT.COLORS.GRAY.DARK,
    },
});

export default styles;
