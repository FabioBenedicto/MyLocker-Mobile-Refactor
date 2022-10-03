import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import RentLockerScreen from '../Screens/RentLockerScreen';
import PaymentScreen from '../Screens/PaymentScreen';

export default function AppRoutes() {
    const { Navigator, Screen } = createStackNavigator();

    return (
        <Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#0085FF',
                },
                headerTintColor: '#fff',
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }}
        >
            <Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Perfil' }} />
            <Screen name="RentLockerScreen" component={RentLockerScreen} />
            <Screen name="PaymentScreen" component={PaymentScreen} />

        </Navigator>
    );
}
