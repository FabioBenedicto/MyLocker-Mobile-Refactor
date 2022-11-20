import { useNavigation } from '@react-navigation/native';
import React, { createRef, useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, BackHandler, TouchableWithoutFeedback, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import MyLockerLogo from '../../assets/MyLockerLogo.png';
import Button from '../../components/Button';
import gStyles from '../../components/gStyles';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import authStyles from '../../styles/authStyles';
import globalStyles from '../../styles/globalStyles';

import styles from './styles';
import useDarkTheme from '../../hooks/useDarkTheme';
import DARK from '../../theme/dark';
import LIGHT from '../../theme/light';
import ShortLogoWhite from '../../assets/ShortLogoWhite.png';

export default function VerifyEmailScreen() {
    const navigation = useNavigation();
    const {darkTheme} = useDarkTheme();
    const { user, setUser } = useUser();

    const inputs = [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()];

    const ALLOWED_CHARACTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'r', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    const [input1Value, setInput1Value] = useState('');
    const [input2Value, setInput2Value] = useState('');
    const [input3Value, setInput3Value] = useState('');
    const [input4Value, setInput4Value] = useState('');
    const [input5Value, setInput5Value] = useState('');
    const [input6Value, setInput6Value] = useState(null);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const toast = useToast();
    const [howManyTimesDelete, setHowManyTimesDelete] = useState(0);

    const handleCodeSubmit = () => {
        const codeType = input1Value
            + input2Value
            + input3Value
            + input4Value
            + input5Value
            + input6Value;
        if (codeType == user.code) {
            toast.show('Verificação realizada com sucesso', { type: 'success' });
            setTimeout(() => {
                toast.hideAll();
                navigation.navigate('CreatePasswordScreen');
            }, 1500);
        } else {
            toast.show('Código Incorreto', { type: 'danger' });
        }
    };

    const handleKeyPress = (e, value) => {
        if (ALLOWED_CHARACTERS.includes(e.nativeEvent.key.toLowerCase())) {
            if (value != 5) {
                inputs[++value].current.focus();
            } else {
                setHowManyTimesDelete(0);
                Keyboard.dismiss();
            }
        }
        if (e.nativeEvent.key == 'Backspace') {
            if (value == 0) {
                Keyboard.dismiss();
                return;
            }

            if (value != 5 || howManyTimesDelete == 1) {
                inputs[--value].current.clear();
                inputs[value].current.focus();
                setHowManyTimesDelete(0);
            } else {
                setHowManyTimesDelete(1);
            }
        }
        console.log(howManyTimesDelete);
    };

    const handleCodeResubmit = () => {
        const requestBody = {
            email: user.email,
        };
        toast.show('Reenviando código...', { type: 'warning', duration: 100000 });
        api
            .put('/students/generate-code', requestBody)
            .then((response) => {
                const { randomCode } = response.data;
                setUser({ ...user, code: randomCode });
                toast.hideAll();
                toast.show('Código reenviado!', { type: 'success' });
            })
            .catch((err) => {
                toast.hideAll();
                toast.show(err.response.data.erro, { type: 'danger' });
            });
    };

    const backAction = () => {
        toast.show(
            'É recomendado você recuperar sua senha antes de sair',
        );
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
            BackHandler.removeEventListener('hardwareBackPress', backAction); BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView bounces={false}>
                        <View style={[globalStyles.container, { height: containerHeight }]}>

                            <View style={authStyles.logoContainer}>
                                <Image
                                    source={darkTheme ? ShortLogoWhite : MyLockerLogo}
                                    style={globalStyles.image}
                                />
                            </View>

                            <View style={globalStyles.fullWidth}>
                                <View style={[globalStyles.textContainer, globalStyles.spacingBottom]}>
                                    <Text style={gStyles.title}>Verifique seu e-mail</Text>
                                    <Text style={gStyles.subtitle}>Digite o código enviado para o seu e-mail</Text>
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={[authStyles.input, styles.input, darkTheme
                                            ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND, color: DARK.COLORS.TEXT_PRIMARY }
                                            : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND, color: LIGHT.COLORS.TEXT_PRIMARY }]}
                                        ref={inputs[0]}
                                        maxLength={1}
                                        value={input1Value}
                                        onChangeText={(text) => setInput1Value(text)} onKeyPress={(e) => handleKeyPress(e, 0)}
                                    />

                                    <TextInput
                                        style={[authStyles.input, styles.input, darkTheme
                                            ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND, color: DARK.COLORS.TEXT_PRIMARY }
                                            : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND, color: LIGHT.COLORS.TEXT_PRIMARY }]}
                                        ref={inputs[1]}
                                        maxLength={1}
                                        value={input2Value}
                                        onChangeText={(text) => setInput2Value(text)} onKeyPress={(e) => handleKeyPress(e, 1)}
                                    />

                                    <TextInput
                                        style={[authStyles.input, styles.input, darkTheme
                                            ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND, color: DARK.COLORS.TEXT_PRIMARY }
                                            : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND, color: LIGHT.COLORS.TEXT_PRIMARY }]}
                                        ref={inputs[2]}
                                        maxLength={1}
                                        value={input3Value}
                                        onChangeText={(text) => setInput3Value(text)} onKeyPress={(e) => handleKeyPress(e, 2)}
                                    />

                                    <TextInput
                                        style={[authStyles.input, styles.input, darkTheme
                                            ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND, color: DARK.COLORS.TEXT_PRIMARY }
                                            : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND, color: LIGHT.COLORS.TEXT_PRIMARY }]}
                                        ref={inputs[3]}
                                        maxLength={1}
                                        value={input4Value}
                                        onChangeText={(text) => setInput4Value(text)} onKeyPress={(e) => handleKeyPress(e, 3)}
                                    />

                                    <TextInput
                                        style={[authStyles.input, styles.input, darkTheme
                                            ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND, color: DARK.COLORS.TEXT_PRIMARY }
                                            : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND, color: LIGHT.COLORS.TEXT_PRIMARY }]}
                                        ref={inputs[4]}
                                        maxLength={1}
                                        value={input5Value}
                                        onChangeText={(text) => setInput5Value(text)} onKeyPress={(e) => handleKeyPress(e, 4)}
                                    />

                                    <TextInput
                                        style={[authStyles.input, styles.input, darkTheme
                                            ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND, color: DARK.COLORS.TEXT_PRIMARY }
                                            : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND, color: LIGHT.COLORS.TEXT_PRIMARY }]}
                                        ref={inputs[5]}
                                        maxLength={1}
                                        value={input6Value}
                                        onChangeText={(text) => setInput6Value(text)} onKeyPress={(e) => handleKeyPress(e, 5)}
                                    />
                                </View>

                                <TouchableOpacity style={authStyles.linkContainer} onPress={handleCodeResubmit}>
                                    <Text style={authStyles.linkText}>Reenviar código</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={gStyles.buttonContainer}>
                                <Button text="Continuar" action={handleCodeSubmit}>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
