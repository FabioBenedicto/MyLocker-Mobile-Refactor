import React, { useEffect, useState } from 'react';
import {
  BackHandler, Image, Keyboard, KeyboardAvoidingView, ScrollView,
  Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useToast } from 'react-native-toast-notifications';

import { CaretCircleLeft } from 'phosphor-react-native';
import MyLockerLogo from '../../assets/MyLockerLogo.png';
import ShortLogoWhite from '../../assets/ShortLogoWhite.png';

import Button from '../../components/Button';

import api from '../../services/api';

import useDarkTheme from '../../hooks/useDarkTheme';
import useUser from '../../hooks/useUser';

import DARK from '../../theme/dark';
import DEFAULT from '../../theme/default';
import LIGHT from '../../theme/light';

import authStyles from '../../styles/authStyles';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';

export default function LoginScreen() {
  const navigation = useNavigation();
  const toast = useToast();

  const { user, setUser } = useUser();
  const { darkTheme } = useDarkTheme();

  const [containerHeight, setContainerHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loginWithEmailSucceed, setLoginWithEmailSucceed] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const forgotEmailToast = () => {
    toast.show('Seu email institucional segue o seguinte formato: "clRA@g.unicamp.br"');
  };

  const handleEmailVerification = () => {
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
  };

  const handlePasswordVerification = async () => {
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
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      BackHandler.removeEventListener('hardwareBackPress', backAction);
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
            <View style={[globalStyles.container, { height: containerHeight }]}>
              {loginWithEmailSucceed ? (
                <TouchableOpacity
                  onPress={() => { setLoginWithEmailSucceed(false); }}
                  style={{
                    alignSelf: 'flex-start',
                    position: 'absolute',
                    left: 4,
                    top: getStatusBarHeight() + 24,
                  }}
                >
                  <CaretCircleLeft
                    size={32}
                    color={darkTheme ? DARK.COLORS.BUTTON_BACKGROUND : DEFAULT.COLORS.LINK}
                    weight="bold"
                  />
                </TouchableOpacity>
              ) : null}
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
                      : { color: LIGHT.COLORS.TEXT_PRIMARY }]}
                  >
                    Entrar
                  </Text>
                  <Text
                    style={[authStyles.subtitle, darkTheme
                      ? { color: DARK.COLORS.TEXT_SECONDARY  }
                      : { color: LIGHT.COLORS.TEXT_SECONDARY }]}
                  >
                    {loginWithEmailSucceed
                      ? 'Digite sua senha para fazer login'
                      : 'Digite seu e-mail da Unicamp'}
                  </Text>
                </View>
                <View style={globalStyles.fullWidth}>
                  {loginWithEmailSucceed ? (
                    <>
                      <TextInput
                        style={[styles.input, styles.inputDisable, darkTheme
                          ? { backgroundColor: DARK.COLORS.INPUT_DISABLE_BACKGROUND, color: DARK.COLORS.TEXT_SECONDARY }
                          : { backgroundColor: LIGHT.COLORS.INPUT_DISABLE_BACKGROUND, color: LIGHT.COLORS.TEXT_SECONDARY }]}
                        value={email}
                        editable={false}
                        selectTextOnFocus={false}
                        placeholder="E-mail"
                        placeholderTextColor="#7D7B7B"
                      />
                      <View
                        style={[authStyles.inputArea, darkTheme
                          ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND }
                          : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND }]}
                      >
                        <TextInput
                          style={[authStyles.passwordInput, darkTheme
                            ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND, color: DARK.COLORS.SECONDARY_TEXT }
                            : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND, color: LIGHT.COLORS.TEXT_SECONDARY }]}
                          value={password}
                          placeholder="Senha"
                          placeholderTextColor="#7D7B7B"
                          onChangeText={(text) => setPassword(text)}
                          secureTextEntry={hidePassword}
                          blurOnSubmit={false}
                          onSubmitEditing={() => {
                            Keyboard.dismiss();
                          }}
                          autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} />
                      </View>
                      <TouchableOpacity
                        style={authStyles.linkContainer}
                        onPress={() => { navigation.navigate('VerifyEmailScreen'); }}
                      >
                        <Text
                          style={authStyles.linkText}
                          onPress={() => { navigation.navigate('ForgotPasswordScreen'); }}
                        >
                          Esqueceu sua senha?
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TextInput
                        style={[authStyles.input, darkTheme
                          ? { backgroundColor: DARK.COLORS.INPUT_BACKGROUND, color: DEFAULT.COLORS.WHITE }
                          : { backgroundColor: LIGHT.COLORS.INPUT_BACKGROUND, color: DEFAULT.COLORS.BLACK }]}
                        value={email}
                        placeholder="E-mail Institucional"
                        placeholderTextColor="#7D7B7B"
                        onChangeText={(text) => setEmail(text)}
                        onSubmitEditing={() => {Keyboard.dismiss();}}
                        autoCapitalize="none"
                      />
                      <TouchableOpacity
                        style={authStyles.linkContainer}
                        onPress={forgotEmailToast}
                      >
                        <Text style={authStyles.linkText}>
                          Esqueceu seu e-mail?
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
              <View style={globalStyles.buttonContainer}>
                <Button 
                text="Continuar" 
                loading={loading} 
                action={loginWithEmailSucceed 
                ? handlePasswordVerification 
                : handleEmailVerification}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
