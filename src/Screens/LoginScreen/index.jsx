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

                        {
                            !loginWithEmailSucceed
                                ? (
                                    <View style={[gStyles.container, { height: containerHeight }]}>

                                        <View style={gStyles.imageContainer}>
                                            <Image source={!darkTheme ? MyLockerLogo : MyLockerLogoPaintedWhite} style={gStyles.image} />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <View style={[gStyles.textContainer, { marginBottom: 40 }]}>
                                                <Text style={gStyles.title}>Entrar</Text>
                                                <Text style={gStyles.subtitle}>Digite seu e-mail da Unicamp</Text>
                                            </View>
                                            <View style={{ width: '100%' }}>
                                                <TextInput style={styles.input} value={email} placeholder="E-mail Institucional" placeholderTextColor="#7D7B7B" onChangeText={(text) => setEmail(text)} onSubmitEditing={() => { Keyboard.dismiss(); }} autoCapitalize="none" />
                                                <TouchableOpacity style={gStyles.linkContainer} onPress={forgotEmailToast}>
                                                    <Text style={gStyles.linkText}>Esqueceu seu e-mail?</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={gStyles.buttonContainer}>
                                            <Button press={handleEmailVerification} disabled={!!loading}>
                                                <View style={{ height: 30 }}>
                                                    {loading ? <ActivityIndicator size="large" color="white" /> : (
                                                        <Text style={gStyles.textButton}>Continuar</Text>
                                                    )}
                                                </View>
                                            </Button>
                                        </View>
                                    </View>
                                )
                                : (
                                    <View style={[gStyles.container, { height: containerHeight }]}>
                                        <TouchableOpacity onPress={() => { setLoginWithEmailSucceed(false); }} style={{ alignSelf: 'flex-start', position: 'absolute', top: getStatusBarHeight() + 40 }}>
                                            <MaterialIcons
                                                name="keyboard-arrow-left"
                                                color="#0085FF"
                                                size={49}
                                            />
                                        </TouchableOpacity>

                                        <View style={gStyles.imageContainer}>
                                            <Image source={MyLockerLogo} style={gStyles.image} />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <View style={[gStyles.textContainer, { marginBottom: 40 }]}>
                                                <Text style={gStyles.title}>Entrar</Text>
                                                <Text style={gStyles.subtitle}>Digite sua senha para fazer login</Text>
                                            </View>
                                            <View style={{ width: '100%' }}>
                                                <TextInput style={[styles.input, styles.inputDisable]} value={email} editable={false} selectTextOnFocus={false} placeholder="E-mail" placeholderTextColor="#7D7B7B" />
                                                <View style={gStyles.inputArea}>
                                                    <TextInput style={gStyles.passwordInput} value={password} placeholder="Senha" placeholderTextColor="#7D7B7B" onChangeText={(text) => setPassword(text)} secureTextEntry={hidePassword} blurOnSubmit={false} onSubmitEditing={() => { Keyboard.dismiss(); }} autoCapitalize="none" />
                                                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                                        {hidePassword
                                                            ? <MaterialIcons name="visibility" color="#000" size={25} />
                                                            : <MaterialIcons name="visibility-off" color="#000" size={25} />}
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity
                                                    style={gStyles.linkContainer}
                                                    onPress={() => {
                                                        navigation.navigate('VerifyEmailScreen');
                                                    }}
                                                >
                                                    <Text style={gStyles.linkText} onPress={() => { navigation.navigate('ForgotPasswordScreen'); }}>Esqueceu sua senha?</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={gStyles.buttonContainer}>
                                            <Button press={handlePasswordVerification} disabled={!!loading}>
                                                <View style={{ height: 30 }}>
                                                    {loading
                                                        ? <ActivityIndicator size="large" color="white" />
                                                        : <Text style={gStyles.textButton}>Continuar</Text>}
                                                </View>
                                            </Button>
                                        </View>
                                    </View>
                                )
                        }

                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
