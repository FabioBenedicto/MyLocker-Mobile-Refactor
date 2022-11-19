import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ToastProvider } from 'react-native-toast-notifications';
import DarkThemeContextProvider from './src/contexts/DarkThemeContext';
import { LockerContextProvider } from './src/contexts/LockerContext';
import { UserContextProvider } from './src/contexts/UserContext';
import useUser from './src/hooks/useUser';
import Routes from './src/routes';

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded] = useFonts({
        // eslint-disable-next-line global-require
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        // eslint-disable-next-line global-require
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        // eslint-disable-next-line global-require
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    });
    SplashScreen.preventAutoHideAsync();
    const { cookieLoaded } = useUser();

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if ((fontsLoaded)) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <DarkThemeContextProvider>
                <ToastProvider placement="top" animationType="slide-in" offsetTop={getStatusBarHeight() + 20} textStyle={{ textAlign: 'center' }}>
                    <UserContextProvider>
                        <LockerContextProvider>
                            <StatusBar
                                animated
                                barStyle="light-content"
                                backgroundColor="#002147"
                            />
                            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                                <Routes />
                            </View>
                        </LockerContextProvider>
                    </UserContextProvider>
                </ToastProvider>
            </DarkThemeContextProvider>
        </NavigationContainer>
    );
}
