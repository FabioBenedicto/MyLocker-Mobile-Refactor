import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Image, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useToast } from 'react-native-toast-notifications';
import MyLockerLogo from '../../assets/MyLockerLogo.png';
import Button from '../../components/Button';
import useUser from '../../hooks/useUser';
import authStyles from '../../styles/authStyles';
import useDarkTheme from '../../hooks/useDarkTheme';
import DARK from '../../theme/dark';
import LIGHT from '../../theme/light';
import DEFAULT from '../../theme/default';
import ShortLogoWhite from '../../assets/ShortLogoWhite.png'
import Back from '../../components/Back';

import api from '../../services/api';
import globalStyles from '../../styles/globalStyles';

export default function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useUser();
    const toast = useToast();
    const darkTheme = useDarkTheme();

    const handleEmailInput = () => {
        const requestBody = {
            email,
        };

        setLoading(true);

        api
            .put('/students/generate-code', requestBody)
            .then((response) => {
                const { randomCode } = response.data;
                setUser({ ...user, email, code: randomCode });
                setLoading(false);
                toast.show('Bem vindo de volta - Crie sua nova senha!', { type: 'success' });
                setTimeout(() => {
                    toast.hideAll();
                    navigation.navigate('VerifyEmailScreen');
                }, 1500);
            })
            .catch((err) => {
                toast.error(err.response.data.erro);
            });
    };

    const backAction = () => {
        navigation.navigate('LoginScreen');
        return true;
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            },
        );
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
            BackHandler.removeEventListener('hardwareBackPress', backAction); BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    return (
        <ScrollView
            bounces={false}
            onLayout={(event) => { if (!isKeyboardVisible) { setContainerHeight(event.nativeEvent.layout.height); } }}
        >
            <KeyboardAvoidingView behavior="height">
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                    <ScrollView bounces={false}>
                        <View style={[authStyles.container, { height: containerHeight }]}>
                            <View style={authStyles.backContainer}>
                            <Back action={() => { navigation.navigate('LoginScreen');}}/>
                            </View>
                            <View style={authStyles.logoContainer}>
                                <Image
                                    source={darkTheme ? ShortLogoWhite : MyLockerLogo}
                                    style={globalStyles.image}
                                />
                            </View>
                            <View style={globalStyles.fullWidth}>
                                <View style={authStyles.textContainer}>
                                    <Text
                                        style={[authStyles.title, darkTheme
                                            ? { color: DARK.COLORS.TEXT_PRIMARY }
                                            : { color: DARK.COLORS.TEXT_PRIMARY }]}
                                    >
                                        Entrar
                                    </Text>
                                    <Text
                                        style={[authStyles.subtitle, darkTheme
                                            ? { color: DARK.COLORS.TEXT_SECONDARY }
                                            : { color: DARK.COLORS.TEXT_SECONDARY }]}
                                    >
                                        Digite seu e-mail da Unicamp
                                    </Text>
                                </View>
                                <View style={globalStyles.fullWidth}>
                                    <TextInput
                                        style={[authStyles.input, darkTheme
                                            ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND, color: DARK.COLORS.TEXT_PRIMARY }
                                            : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND, color: LIGHT.COLORS.TEXT_PRIMARY }]}
                                        value={email}
                                        placeholder="E-mail Institucional"
                                        placeholderTextColor="#7D7B7B"
                                        onChangeText={(text) => setEmail(text)} onSubmitEditing={() => { Keyboard.dismiss(); }}
                                        autoCapitalize="none" />
                                </View>
                            </View>
                            <View style={globalStyles.buttonContainer}>
                                <Button text="Continuar" loading={loading} action={handleEmailInput}/>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
