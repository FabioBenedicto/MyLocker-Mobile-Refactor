import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreatePasswordScreen from '../Screens/CreatePasswordScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import LoginScreen from '../Screens/LoginScreen';
import VerifyEmailScreen from '../Screens/VerifyEmailScreen';

export default function AuthRoutes() {
    const { Navigator, Screen } = createStackNavigator();

    return (
        <Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff',
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
