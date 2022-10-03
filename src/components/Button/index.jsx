import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function Btn({ children, press, disabled }) {
    return (
        <TouchableOpacity style={disabled ? [styles.container, styles.inputDisable] : styles.container} activeOpacity={0.8} onPress={press}>
            {children}
        </TouchableOpacity>
    );
}
