import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreatePasswordScreen from '../Screens/CreatePasswordScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import LoginScreen from '../Screens/LoginScreen';
import VerifyEmailScreen from '../Screens/VerifyEmailScreen';
import useDarkTheme from '../hooks/useDarkTheme';
import LIGHT from '../theme/light';
import DEFAULT from '../theme/default';
import DARK from '../theme/dark';

export default function AuthRoutes() {
    const { Navigator, Screen } = createStackNavigator();
    const { darkTheme, setDarkTheme } = useDarkTheme();

    return (
        <Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
                headerShown: true,
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: DEFAULT.COLORS.WHITE,
                },
                headerShadowVisible: false,
                cardStyle: {
                    backgroundColor: darkTheme ? DARK.COLORS.BACKGROUND : LIGHT.COLORS.BACKGROUND,
                },
                headerBackTitleVisible: false,
                headerTitleStyle: {
                    fontSize: 0,
                },

            }}
        >

            <Screen name="LoginScreen" component={LoginScreen} />
            <Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
            <Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
            <Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />

        </Navigator>
    );
}
