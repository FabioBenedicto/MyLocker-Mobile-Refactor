import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ConfigurationScreen from '../Screens/ConfigurationScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import RentLockerScreen from '../Screens/RentLockerScreen';

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
            <Screen name="ConfigurationScreen" component={ConfigurationScreen} options={{ title: 'Configurações' }} />

        </Navigator>
    );
}
