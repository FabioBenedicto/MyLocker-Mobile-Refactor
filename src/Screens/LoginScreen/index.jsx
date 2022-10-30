/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Image, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

import { MaterialIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import useDarkTheme from '../../hooks/useDarkTheme';
import useUser from '../../hooks/useUser';

import Button from '../../components/Button';
import gStyles from '../../components/gStyles';

import api from '../../services/api';
import styles from './styles';

import MyLockerLogo from '../../assets/MyLockerLogo.png';
import MyLockerLogoPaintedWhite from '../../assets/MyLockerLogoPaintedWhite.png';
import globalStyles from '../../styles/globalStyles';
import authStyles from '../../styles/authStyles';
import DEFAULT from '../../theme/default';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [hidePassword, setHidePassword] = useState(true);
    const [loginWithEmailSucceed, setLoginWithEmailSucceed] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const toast = useToast();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { user, setUser } = useUser();
    const { darkTheme } = useDarkTheme();

    const forgotEmailToast = () => {
        toast.show(
            'Seu email institucional segue o seguinte formato: "clRA@g.unicamp.br"',
        );
    };

    const verifyEmailInput = () => {
        if (email.trim() != '') {
            setEmail(email.trim());
            return true;
        }
        return false;
    };

    const handleEmailVerification = () => {
        if (verifyEmailInput()) {
            const requestBody = {
                email,
            };
            setLoading(true);
            api
                .post('/students/verifyPasswordExistence', requestBody)
                .then((response) => {
                    const { hasPassword } = response.data;
                    if (hasPassword) {
                        setLoginWithEmailSucceed(true);
                        setLoading(false);
                    } else {
                        api
                            .put('/students/generate-code', requestBody)
                            // eslint-disable-next-line no-shadow
                            .then((response) => {
                                const { randomCode } = response.data;
                                setLoading(false);
                                toast.show('Bem vindo ao MyLocker - Crie sua senha!', { type: 'success' });
                                setTimeout(() => {
                                    toast.hideAll();
                                    setUser({ ...user, email, code: randomCode });
                                    navigation.navigate('VerifyEmailScreen');
                                }, 1500);
                            })
                            .catch((err) => {
                                toast.show(err.response.data.erro, { type: 'danger' });
                            });
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    toast.show(err.response.data.erro, { type: 'danger' });
                });
        } else {
            toast.show('Digite um endereço de e-mail válido', { type: 'danger', placement: 'top', offsetTop: -100 });
        }
    };

    const verifyPassword = () => {
        if (password != '') {
            return true;
        }
        return false;
    };

    const handlePasswordVerification = async () => {
        if (verifyPassword()) {
            const requestBody = {
                email,
                password,
            };
            setLoading(true);
            api
                .post('/students/session', requestBody, { withCredentials: true })
                .then((response) => {
                    setLoading(false);
                    toast.show('Login realizado com sucesso', { type: 'success' });
                    setTimeout(() => {
                        toast.hideAll();
                        setUser(response.data);
                    }, 1500);
                })
                .catch((err) => {
                    setLoading(false);
                    toast.show(err.response.data.erro, { type: 'danger' });
                });
        }
    };

    const backAction = () => {
        if (loginWithEmailSucceed) {
            setLoginWithEmailSucceed(false);
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        }
        return true;
    };

    useEffect(() => {
        console.log('oi');
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

    useEffect(() => {
        if (loginWithEmailSucceed) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { setLoginWithEmailSucceed(false); }} activeOpacity={0.8} style={{ marginLeft: '8%', marginTop: '16%' }}>
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={52}
                            color={DEFAULT.COLORS.BLUE.MEDIUM}
                        />
                    </TouchableOpacity>
                ),
            });
        } else {
            navigation.setOptions({
                headerLeft: () => (null),
            });
        }
        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [loginWithEmailSucceed]);

    return (
        <ScrollView
            bounces={false}
            onLayout={(event) => {
                if (!isKeyboardVisible) {
                    setContainerHeight(event.nativeEvent.layout.height);
                }
            }}
        >
            <KeyboardAvoidingView behavior="height">
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                    <ScrollView bounces={false}>
                        <View style={[globalStyles.container, { height: containerHeight }]}>
                            <View style={authStyles.logoContainer}>
                                <Image source={darkTheme ? MyLockerLogoPaintedWhite : MyLockerLogo} style={globalStyles.image} />
                            </View>
                            <View style={globalStyles.fullWidth}>
                                <View style={authStyles.textContainer}>
                                    <Text style={authStyles.title}>Entrar</Text>
                                    <Text style={authStyles.subtitle}>{loginWithEmailSucceed ? 'Digite sua senha para fazer login' : 'Digite seu e-mail da Unicamp'}</Text>
                                </View>
                                <View style={globalStyles.fullWidth}>
                                    {loginWithEmailSucceed ? (
                                        <>
                                            <TextInput style={[styles.input, styles.inputDisable]} value={email} editable={false} selectTextOnFocus={false} placeholder="E-mail" placeholderTextColor="#7D7B7B" />
                                            <View style={authStyles.inputArea}>
                                                <TextInput style={authStyles.passwordInput} value={password} placeholder="Senha" placeholderTextColor="#7D7B7B" onChangeText={(text) => setPassword(text)} secureTextEntry={hidePassword} blurOnSubmit={false} onSubmitEditing={() => { Keyboard.dismiss(); }} autoCapitalize="none" />
                                                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                                    {hidePassword
                                                        ? <MaterialIcons name="visibility" color={DEFAULT.COLORS.GRAY.MEDIUM} size={25} />
                                                        : <MaterialIcons name="visibility-off" color={DEFAULT.COLORS.GRAY.MEDIUM} size={25} />}
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity
                                                style={authStyles.linkContainer}
                                                onPress={() => {
                                                    navigation.navigate('VerifyEmailScreen');
                                                }}
                                            >
                                                <Text style={authStyles.linkText} onPress={() => { navigation.navigate('ForgotPasswordScreen'); }}>Esqueceu sua senha?</Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <TextInput style={authStyles.input} value={email} placeholder="E-mail Institucional" placeholderTextColor="#7D7B7B" onChangeText={(text) => setEmail(text)} onSubmitEditing={() => { Keyboard.dismiss(); }} autoCapitalize="none" />
                                            <TouchableOpacity style={authStyles.linkContainer} onPress={forgotEmailToast}>
                                                <Text style={authStyles.linkText}>Esqueceu seu e-mail?</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>
                            </View>
                            <View style={globalStyles.buttonContainer}>
                                <Button press={loginWithEmailSucceed ? handlePasswordVerification : handleEmailVerification} disabled={!!loading}>
                                    <View style={globalStyles.buttonContent}>
                                        {loading
                                            ? <ActivityIndicator size="large" color="white" />
                                            : <Text style={globalStyles.textButton}>Continuar</Text>}
                                    </View>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
