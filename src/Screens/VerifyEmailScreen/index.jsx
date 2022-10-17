import { useNavigation } from '@react-navigation/native';
import React, { createRef, useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import MyLockerLogo from '../../assets/MyLockerLogo.png';
import Button from '../../components/Button';
import gStyles from '../../components/gStyles';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import styles from './styles';

export default function VerifyEmailScreen() {
    const navigation = useNavigation();
    const { user, setUser } = useUser();

    const inputs = [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()];

    const ALLOWED_CHARACTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'r', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    const [input1Value, setInput1Value] = useState(null);
    const [input2Value, setInput2Value] = useState(null);
    const [input3Value, setInput3Value] = useState(null);
    const [input4Value, setInput4Value] = useState(null);
    const [input5Value, setInput5Value] = useState(null);
    const [input6Value, setInput6Value] = useState(null);

    const [inputValues, setInputValues] = useState([null, null, null, null, null, null]);
    const [email, setEmail] = useState();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const toast = useToast();

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

    const handleCodeResubmit = () => {
        const requestBody = {
            email: user.email,
        };

        toast.show('Reenviando código...', { type: 'warning' });

        api
            .put('/students/generate-code', requestBody)
            .then((response) => {
                const { randomCode } = response.data;
                setUser({ ...user, code: randomCode });
                toast.hideAll();
                toast.show('Código reenviado!', { type: 'success' });
            })
            .catch((err) => {
                toast.show(err.response.data.erro, { type: 'danger' });
            });
    };

    const handleKeyPress = (e, value) => {
        if (ALLOWED_CHARACTERS.includes(e.nativeEvent.key.toLowerCase())) {
            if (value != 5) {
                inputs[++value].current.focus();
            }
        }

        if (e.nativeEvent.key == 'Backspace') {
            if (value == 0) {
                return;
            }

            value--;
            inputs[value].current.clear();
            inputs[value].current.focus();
        }
    };

    /* const scrClear = () => {
        let empty = false;

        inputs.forEach((aux) => {
            if (aux == null) {
                empty = true;
            }
        });

        if (!empty) {
            inputs.forEach((aux) => {
                aux.current.clear();
            });
        }

        setInputValues(['', '', '', '', '', '']);
    }; */

    /* const verif = () => {
        let auxContagem = 0;

        inputValues.forEach((aux) => {
            if (aux == null || aux.trim() == '') {
                auxContagem++;
            }
        });

        if (auxContagem == 0) {
            return true;
        }

        return false;
    }; */

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

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
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
                        <View style={[gStyles.container, { height: containerHeight }]}>

                            <View style={gStyles.imageContainer}>
                                <Image source={MyLockerLogo} />
                            </View>

                            <View style={gStyles.body}>
                                <View style={[gStyles.textContainer, { marginBottom: 40 }]}>
                                    <Text style={gStyles.title}>Verifique seu e-mail</Text>
                                    <Text style={gStyles.subtitle}>Digite o código enviado para o seu e-mail</Text>
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput style={[gStyles.input, styles.input]} ref={inputs[0]} maxLength={1} value={input1Value} onChangeText={(text) => setInput1Value(text)} onKeyPress={(e) => handleKeyPress(e, 0)} />
                                    <TextInput style={[gStyles.input, styles.input]} ref={inputs[1]} maxLength={1} value={input2Value} onChangeText={(text) => setInput2Value(text)} onKeyPress={(e) => handleKeyPress(e, 1)} />
                                    <TextInput style={[gStyles.input, styles.input]} ref={inputs[2]} maxLength={1} value={input3Value} onChangeText={(text) => setInput3Value(text)} onKeyPress={(e) => handleKeyPress(e, 2)} />
                                    <TextInput style={[gStyles.input, styles.input]} ref={inputs[3]} maxLength={1} value={input4Value} onChangeText={(text) => setInput4Value(text)} onKeyPress={(e) => handleKeyPress(e, 3)} />
                                    <TextInput style={[gStyles.input, styles.input]} ref={inputs[4]} maxLength={1} value={input5Value} onChangeText={(text) => setInput5Value(text)} onKeyPress={(e) => handleKeyPress(e, 4)} />
                                    <TextInput style={[gStyles.input, styles.input]} ref={inputs[5]} maxLength={1} value={input6Value} onChangeText={(text) => setInput6Value(text)} onKeyPress={(e) => handleKeyPress(e, 5)} />
                                </View>

                                <TouchableOpacity style={gStyles.linkContainer} onPress={handleCodeResubmit}>
                                    <Text style={gStyles.linkText}>Reenviar código</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={gStyles.buttonContainer}>
                                <Button text="Continuar" press={handleCodeSubmit}>
                                    <View style={{ height: 30 }}>
                                        <Text style={gStyles.textButton}>Continuar</Text>
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
