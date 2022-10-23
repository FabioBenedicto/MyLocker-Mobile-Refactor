import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

export const DarkThemeContext = createContext({});

export default function DarkThemeContextProvider({ children }) {
    const toast = useToast();

    const [darkTheme, setDarkTheme] = useState(() => {
        try {
            const isDarkModeSet = AsyncStorage.getItem('darkMode');
            if (isDarkModeSet == 'true') {
                return true;
            }
            return false;
        } catch (e) {
            toast.show('O MyLocker não conseguiu receber o toma', { type: 'danger' });
            return false;
        }
    });

    useEffect(() => {
        try {
            const fechItem = async () => { AsyncStorage.setItem('darkMode', darkTheme); };
        } catch (e) {
            toast.show('O MyLocker não conseguiu alterar o tema', { type: 'danger' });
        }
    }, [darkTheme]);

    return (
        <DarkThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            {children}
        </DarkThemeContext.Provider>
    );
}
