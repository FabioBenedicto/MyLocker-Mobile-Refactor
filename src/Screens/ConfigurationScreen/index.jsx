import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import DefaultProfilePicture from '../../assets/DefaultProfilePicture.jpg';
import gStyles from '../../components/gStyles';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import THEME from '../../theme';
import styles from './styles';

export default function ConfigurationScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState('');
    const navigation = useNavigation();
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
        const selectedImage = await launchCamera();
    };

    useEffect(() => {
        navigation.setOptions({ headerShown: true });
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

                <TouchableOpacity activeOpacity={0.8} style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        value={isEnabled}
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
