import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Image, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useToast } from 'react-native-toast-notifications';
import { Cube } from 'phosphor-react-native';
import MyLockerLogo from '../../assets/MyLockerLogo.png';
import Button from '../../components/Button';
import gStyles from '../../components/gStyles';
import useUser from '../../hooks/useUser';

import api from '../../services/api';

export default function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useUser();
    const toast = useToast();

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
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen'); }} activeOpacity={0.8}>
                    <MaterialIcons
                        name="arrow-back"
                        size={40}
                        color="blue"
                    />
                </TouchableOpacity>
            ),
        });

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
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
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
                                <Image source={MyLockerLogo} style={gStyles.image} />
                            </View>

                            <View style={{ width: '100%' }}>
                                <View style={[gStyles.textContainer, { marginBottom: 40 }]}>
                                    <Text style={gStyles.title}>Entrar</Text>
                                    <Text style={gStyles.subtitle}>Digite seu e-mail da Unicamp</Text>
                                </View>
                                <View style={{ width: '100%' }}>
                                    <TextInput style={gStyles.input} value={email} placeholder="E-mail Institucional" placeholderTextColor="#7D7B7B" onChangeText={(text) => setEmail(text)} onSubmitEditing={() => { Keyboard.dismiss(); }} autoCapitalize="none" />
                                </View>
                            </View>

                            <View style={gStyles.buttonContainer}>
                                <Button press={handleEmailInput} disabled={!!loading}>
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
