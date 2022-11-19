import { StyleSheet } from 'react-native';
import DEFAULT from '../../theme/default';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'spac,e-between',
    },
    header: {
        width: '100%',
        height: 140,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    settingsButton: {
        marginTop: 20,
        marginRight: 20,
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginTop: -20,
    },
    userInformation: {

    },
    firstName: {
        fontFamily: DEFAULT.FONT_FAMILY.REGULAR,
        fontSize: DEFAULT.FONT_SIZE.LG,
        color: DEFAULT.COLORS.TEXT_BLACK,
    },
    lastName: {
        fontFamily: DEFAULT.FONT_FAMILY.REGULAR,
        fontSize: DEFAULT.FONT_SIZE.MD,
        color: DEFAULT.COLORS.TEXT_GRAY,
    },
    userImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
    },
    body: {
        padding: '4%',
    },
    title: {
        fontFamily: DEFAULT.FONT_FAMILY.MEDIUM,
        fontSize: DEFAULT.FONT_SIZE.LG,
    },
    noLockerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noLockerText: {
        fontFamily: DEFAULT.FONT_FAMILY.MEDIUM,
        color: DEFAULT.COLORS.TEXT_GRAY,
        fontSize: DEFAULT.FONT_SIZE.SM,
    },
});

export default styles;
