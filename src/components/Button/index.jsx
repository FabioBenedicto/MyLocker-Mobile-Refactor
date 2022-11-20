import React from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import styles from './styles';
import useDarkTheme from '../../hooks/useDarkTheme';
import DARK from '../../theme/dark';
import LIGHT from '../../theme/light';

export default function Button({ text, loading, action}) {
    const {darkTheme} = useDarkTheme();
    return (
        <TouchableOpacity 
        style={[
            styles.container, 
            darkTheme 
            ? {backgroundColor: DARK.COLORS.BUTTON_BACKGROUND} 
            : {backgroundColor: LIGHT.COLORS.BUTTON_BACKGROUND},
            loading 
            ? darkTheme 
            ? {backgroundColor: DARK.COLORS.BUTTON_LOADING_BACKGROUND} 
            : {backgroundColor: LIGHT.COLORS.BUTTON_LOADING_BACKGROUND}
            : null
        ]}
        activeOpacity={0.8} 
        onPress={action}
        >
            <View style={styles.contentContainer}>
            {
                loading 
                ? <ActivityIndicator size="large" color="white"/> 
                : <Text style={[styles.text, darkTheme ? {color: DARK.COLORS.TEXT_BUTTON} : {color: LIGHT.COLORS.TEXT_BUTTON}]}>{text}</Text>
            }
            </View>
        </TouchableOpacity>
    );
}
