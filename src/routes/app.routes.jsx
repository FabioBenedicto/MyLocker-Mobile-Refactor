import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ConfigurationScreen from '../Screens/ConfigurationScreen';
import ApmScreen from '../Screens/ApmScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import RentLockerScreen from '../Screens/RentLockerScreen';
import useDarkTheme from '../hooks/useDarkTheme';
import LIGHT from '../theme/light';
import DEFAULT from '../theme/default';
import DARK from '../theme/dark';

export default function AppRoutes() {
    const { Navigator, Screen } = createStackNavigator();
    const { darkTheme, setDarkTheme } = useDarkTheme();

    return (
        <Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                // headerShown: true,
                // headerTransparent: true,
                headerStyle: {
                    backgroundColor: DEFAULT.COLORS.BLUE.MEDIUM,
                },
                cardStyle: {
                    backgroundColor: darkTheme ? DARK.COLORS.BACKGROUND : LIGHT.COLORS.BACKGROUND,
                },
                headerTitleStyle: {
                    fontSize: 0,
                },
                headerTitleAlign: 'center',
            }}
        >
            <Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Perfil' }} />
            <Screen name="RentLockerScreen" component={RentLockerScreen} />
            <Screen name="PaymentScreen" component={PaymentScreen} />
            <Screen name="ConfigurationScreen" component={ConfigurationScreen} options={{ title: 'Configurações' }} />
            <Screen name="ApmScreen" component={ApmScreen} options={{ title: 'APM' }} />

        </Navigator>
    );
}
