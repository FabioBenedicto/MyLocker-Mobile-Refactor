import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Image, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useToast } from 'react-native-toast-notifications';
import { createRef } from 'react/cjs/react.production.min';
import MyLockerLogo from '../../assets/MyLockerLogo.png';
import Button from '../../components/Button';
import gStyles from '../../components/gStyles';
import useUser from '../../hooks/useUser';
import api from '../../services/api';

export default function CreatePasswordScreen() {
    const navigation = useNavigation();
    const cont = [createRef(), createRef()];
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
    const toast = useToast();
    const handleCreatePassword = () => {
        const regex = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/);
        const passwordHasLettersAndNumbers = regex.test(password);

        if (!passwordHasLettersAndNumbers) {
            toast.show('Sua senha deve conter numeros, letras minusculas e letras maiusculas', { type: 'danger' });
            return;
        }

        const passwordsMatches = password == passwordConfirm;

        if (!passwordsMatches) {
            toast.show('Sua senha deve conter numeros, letras minusculas e letras maiusculas', { type: 'danger' });
            return;
        }

        if (passwordsMatches) {
            const requestBody = {
                email: user.email,
                password,
            };

            setLoading(true);

            api.get('/logout/students', { withCredentials: true }).then(() => {
                setUser({
                    ra: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    code: '',
                    password: '',
                    locker_number: undefined,
                    status: undefined,
                });

                api
                    .put('/students/update-password', requestBody)
                    .then(() => {
                        toast.show('Senha criada com sucesso', { type: 'success' });
                        setLoading(false);
                        navigation.navigate('LoginScreen');
                    })
                    .catch((err) => {
                        toast.show(err.response.data, { type: 'success' });
                        setLoading(false);
                    });
            });
        }
    };

    /* const scrClear = () => {
        if (pass != '') {
            cont[0].current.clear();
        }

        if (conf != '') {
            cont[1].current.clear();
        }

        setPass('');
        setConf('');
    }; */

    const backAction = () => {
        navigation.navigate('Login');

        // scrClear();

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
            BackHandler.removeEventListener('hardwareBackPress', backAction);
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
            <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={40}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView bounces={false}>
                        <View style={[gStyles.container, { height: containerHeight }]}>
                            <TouchableOpacity onPress={() => { navigation.goBack(); }} style={{ alignSelf: 'flex-start', position: 'absolute', top: getStatusBarHeight() + 40 }}>
                                <MaterialIcons
                                    name="keyboard-arrow-left"
                                    color="#0085FF"
                                    size={49}
                                />
                            </TouchableOpacity>

                            <View style={gStyles.imageContainer}>
                                <Image source={MyLockerLogo} />
                            </View>

                            <View style={{ width: '100%' }}>
                                <View style={[gStyles.textContainer, { marginBottom: 40 }]}>
                                    <Text style={gStyles.title}>Criar Senha</Text>
                                    <Text style={gStyles.subtitle}>Crie uma senha para sua conta</Text>
                                </View>

                                <View style={gStyles.inputContainer}>
                                    <View style={gStyles.inputArea}>
                                        <TextInput style={gStyles.passwordInput} value={password} placeholder="Senha" placeholderTextColor="#7D7B7B" onChangeText={(text) => setPassword(text)} secureTextEntry={hidePassword} blurOnSubmit={false} onSubmitEditing={() => { Keyboard.dismiss(); }} autoCapitalize="none" />
                                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                            {hidePassword
                                                ? <MaterialIcons name="visibility" color="#000" size={25} />
                                                : <MaterialIcons name="visibility-off" color="#000" size={25} />}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={gStyles.inputArea}>
                                        <TextInput style={gStyles.passwordInput} value={passwordConfirm} placeholder="Confirmar Senha" placeholderTextColor="#7D7B7B" onChangeText={(text) => setPasswordConfirm(text)} secureTextEntry={hidePasswordConfirm} blurOnSubmit={false} onSubmitEditing={() => { Keyboard.dismiss(); }} autoCapitalize="none" />
                                        <TouchableOpacity onPress={() => setHidePasswordConfirm(!hidePasswordConfirm)}>
                                            {hidePasswordConfirm
                                                ? <MaterialIcons name="visibility" color="#000" size={25} />
                                                : <MaterialIcons name="visibility-off" color="#000" size={25} />}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={gStyles.buttonContainer}>
                                <Button press={handleCreatePassword} disabled={!!loading}>
                                    <View style={{ height: 30 }}>
                                        {loading
                                            ? <ActivityIndicator size="large" color="white" />
                                            : <Text style={gStyles.textButton}>Continuar</Text>}
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
