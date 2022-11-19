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

    const handleLogout = () => {
        api.get('/logout/students', { withCredentials: true }).then(() => {
            setUser({
                ra: '',
                first_name: '',
                last_name: '',
                email: '',
            });
        });
    };

    const handleUploadImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({});
        const { uri } = result;
        const name = uri.split('/').pop();

        const photo = {
            uri,
            type: mime.getType(uri),
            name,
        };

        const formData = new FormData();
        formData.append('profile', photo);
        formData.append('ra', user.ra);

        api
            .post('/uploadImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err.response.data.erro);
            });
    };

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
                <TouchableOpacity onPress={() => { navigation.navigate('ProfileScreen'); }} activeOpacity={0.8}>
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
        <View style={gStyles.container}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <Image style={styles.userImage} source={!user.profile_picture_url ? DefaultProfilePicture : { uri: user.profile_picture_url }} />
                <View style={gStyles.textContainer}>
                    <Text style={gStyles.title}>{user.first_name} {user.last_name}</Text>
                    <Text style={gStyles.subtitle}>{user.email}</Text>
                </View>
            </View>

            <View style={{ backgroundColor: '#f2f2f2', borderRadius: 8, width: '100%', paddingHorizontal: '8%' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleUploadImage} style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <MaterialIcons name="account-circle" size={THEME.FONT_SIZE.LG} style={{ marginRight: 4 }} />
                        <Text style={{ fontSize: THEME.FONT_SIZE.MD, fontFamily: THEME.FONT_FAMILY.REGULAR }}>
                            Alterar foto de perfil
                        </Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={THEME.FONT_SIZE.LG} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Crea'); }} style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <MaterialIcons name="lock" size={THEME.FONT_SIZE.LG} style={{ marginRight: 4 }} />
                        <Text style={{ fontSize: THEME.FONT_SIZE.MD, fontFamily: THEME.FONT_FAMILY.REGULAR }}>
                            Alterar Senha
                        </Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={THEME.FONT_SIZE.LG} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={handleUploadDocument} style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <MaterialIcons name="note-add" size={THEME.FONT_SIZE.LG} style={{ marginRight: 4 }} />
                        <Text style={{ fontSize: THEME.FONT_SIZE.MD, fontFamily: THEME.FONT_FAMILY.REGULAR }}>
                            Anexar APM
                        </Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={THEME.FONT_SIZE.LG} />
                </TouchableOpacity>

            </View>

            <View style={{ backgroundColor: '#f2f2f2', borderRadius: 8, width: '100%', paddingHorizontal: '8%' }}>
                <TouchableOpacity activeOpacity={0.8} style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <MaterialIcons name="theme-light-dark" size={THEME.FONT_SIZE.LG} style={{ marginRight: 4 }} />
                        <Text style={{ fontSize: THEME.FONT_SIZE.MD, fontFamily: THEME.FONT_FAMILY.REGULAR }}>
                            Tema Escuro
                        </Text>
                    </View>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={darkTheme}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#f2f2f2', borderRadius: 8, width: '100%', paddingHorizontal: '8%', marginBottom: 40 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleLogout} style={{ height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: THEME.FONT_SIZE.MD, fontFamily: THEME.FONT_FAMILY.REGULAR, color: '#D55F5A' }}>
                        Sair
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
