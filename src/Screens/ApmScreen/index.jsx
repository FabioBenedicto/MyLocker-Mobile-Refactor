/* eslint-disable react/no-unstable-nested-components */
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import { useEffect, useState } from 'react';
import { Image, Switch, Text, TouchableOpacity, View, Platform } from 'react-native';
import DefaultProfilePicture from '../../assets/DefaultProfilePicture.jpg';
import gStyles from '../../components/gStyles';
import Button from '../../components/Button';
import authStyles from '../../styles/authStyles';

import useDarkTheme from '../../hooks/useDarkTheme';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import DEFAULT from '../../theme/default';
import THEME from '../../theme/light';
import styles from './styles';

export default function ConfigurationScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const { darkTheme, setDarkTheme } = useDarkTheme();
    const [loading, setLoading] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState('');
    const navigation = useNavigation();
    const toggleSwitch = () => setDarkTheme((previousState) => !previousState);
    const { user, setUser } = useUser();

    const handleUploadDocument = async () => {
        DocumentPicker.getDocumentAsync();
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitleStyle: {
                fontFamily: DEFAULT.FONT_FAMILY.BOLD,
                color: DEFAULT.COLORS.WHITE,
                fontSize: DEFAULT.FONT_SIZE.MD,
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => { navigation.navigate('ConfigurationScreen'); }} activeOpacity={0.8}>
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={52}
                        color={DEFAULT.COLORS.WHITE}
                    />
                </TouchableOpacity>
            ),
        });
    }, []);

    return (
        <View style={[gStyles.container]}>
            <View style={{ width: '100%', justifyContent: 'space-between' }}>
                <View style={{ marginTop: 80 }}>
                    <View>
                        <Text style={{ alignSelf: 'center', fontSize: THEME.FONT_SIZE.LG, fontFamily: THEME.FONT_FAMILY.BOLD }}>APM</Text>
                    </View>

                    <View>
                        <Text style={[authStyles.subtitle, { textAlign: 'center', fontSize: THEME.FONT_SIZE.SM, fontFamily: THEME.FONT_FAMILY.REGULAR }]}>Submeta seu pedido de desconto pela APM.</Text>
                    </View>
                </View>

                <View style={{ width: '100%' }}>
                    <View style={{ justifyContent: 'center', backgroundColor: '#f2f2f2', borderRadius: 8, width: '100%', height: '50%', paddingHorizontal: '8%' }}>

                        <TouchableOpacity activeOpacity={0.8} onPress={handleUploadDocument} style={{ height: 80, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <MaterialIcons name="note-add" size={THEME.FONT_SIZE.LG} style={{ marginRight: 4 }} />
                                <Text style={{ fontSize: THEME.FONT_SIZE.MD, fontFamily: THEME.FONT_FAMILY.REGULAR }}>
                                    Anexar APM
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={[authStyles.subtitle, { textAlign: 'center', fontSize: THEME.FONT_SIZE.SM, fontFamily: THEME.FONT_FAMILY.REGULAR }]}>Nenhum arquivo selecionado...</Text>
                    </View>
                </View>
            </View>

            <View style={gStyles.buttonContainer}>
                <Button press={() => { navigation.navigate('RentLockerScreen'); }}>
                    <Text style={gStyles.textButton}>Enviar Apm</Text>
                </Button>
            </View>

        </View>
    );
}
