import { useContext } from 'react';
import { DarkThemeContext } from '../contexts/DarkThemeContext';

export default function useDarkTheme() {
    return useContext(DarkThemeContext);
}
