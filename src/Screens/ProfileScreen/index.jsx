import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, BackHandler, Dimensions, Image, Keyboard, KeyboardAvoidingView, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DefaultProfilePicture from '../../assets/DefaultProfilePicture.jpg';
import LockerImage from '../../assets/LockerImage.png';
import NoLockersFounded from '../../assets/NoLockersFounded.png';
import Button from '../../components/Button';
import gStyles from '../../components/gStyles';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import styles from './styles';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [locker, setLocker] = useState({
        key: 757,
        color: '#FF7B7B',
    });
    // const [email, setEmail] = useState(route.params.passEmail);
    const [alertV, setAlertV] = useState(false);
    const { width, height } = Dimensions.get('window');
    const anV = useRef(new Animated.ValueXY({ x: 0, y: height })).current;
    const [modV, setModV] = useState([false]);
    const [email, setEmail] = useState('');
    const { user, setUser } = useUser();
    const [studentLocker, setStudentLocker] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingLocker, setLoadingLocker] = useState(true);

    const loadLocker = async () => {
        if (user.locker_number) {
            api
                .get(`/lockers/${user.locker_number}`)
                .then((response) => {
                    setStudentLocker(response.data);
                    setLoadingLocker(false);
                })
                .catch((err) => {
                    Alert.alert('', err.response.data.erro);
                    setLoadingLocker(false);
                });
        } else {
            setLoadingLocker(false);
        }
    };

    const anStart = () => {
        Animated.timing(
            anV,
            {
                toValue: { x: 0, y: height },
                duration: 2,
                useNativeDriver: false,
            },
        ).start();

        setTimeout(() => {
            setModV(true);

            Animated.timing(
                anV,
                {
                    toValue: { x: 0, y: height / 2 },
                    duration: 300,
                    useNativeDriver: false,
                },
            ).start();
        }, 2);
    };

    const transformHexToPlainText = (hex) => {
        if (hex == '#FDFF97') {
            return 'Amarelo';
        } if (hex == '#FF7B7B') {
            return 'Vermelho';
        } if (hex == '#92B7FF') {
            return 'Azul';
        } if (hex == '#A6FFEA') {
            return 'Verde Água';
        }
        return '';
    };

    useEffect(() => {
        loadLocker();
    }, [user]);

    const backAction = () => {
        Alert.alert('Calma aí!', 'Você tem certeza que quer sair da sua conta?', [
            {
                text: 'Cancelar',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'Sim', onPress: () => handleLogout() },
        ]);
        return true;
    };

    useEffect(() => {
        navigation.setOptions({ headerShown: true });
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    return (
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={80} style={styles.container}>

            <Modal visible={modV} transparent animationType="none">

                <TouchableOpacity style={gStyles.background} onPress={() => setModV(false)} />

                <Animated.View style={[gStyles.modalContainer, anV.getLayout()]}>
                    <View style={gStyles.modalLine} onPress={() => { Keyboard.dismiss(); }} />

                    <ScrollView style={[gStyles.lockerInfo]} sc>
                        <View style={{ paddingHorizontal: '5%' }}>
                            <Text style={gStyles.lockerInfoLabel}>Número:</Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value={studentLocker == null ? '' : studentLocker.number.toString()} editable={false} />
                        </View>

                        <View style={{ paddingHorizontal: '5%' }}>
                            <Text style={gStyles.lockerInfoLabel}>Andar:</Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value="" editable={false} />
                        </View>

                        <View style={{ paddingHorizontal: '5%' }}>
                            <Text style={gStyles.lockerInfoLabel}>Cor: </Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value={studentLocker == null ? '' : transformHexToPlainText(studentLocker.section.color)} editable={false} />
                        </View>
                        <View style={{ paddingHorizontal: '5%' }}>
                            <Text style={gStyles.lockerInfoLabel}>À Esquerda:</Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value={studentLocker == null ? '' : studentLocker.section.left_room.toString()} editable={false} />
                        </View>

                        <View style={{ marginBottom: 40, paddingHorizontal: '5%' }}>
                            <Text style={gStyles.lockerInfoLabel}>À Direita:</Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value={studentLocker == null ? '' : studentLocker.section.right_room.toString()} editable={false} />
                        </View>
                    </ScrollView>

                </Animated.View>

            </Modal>

            <Modal visible={alertV} transparent animationType="none">

                <TouchableOpacity style={gStyles.background} onPress={() => setAlertV(false)} />

                <View style={[gStyles.contentContainerAlert, { alignContent: 'center' }]}>

                    <View>
                        <Text style={[gStyles.smallTitle, { textAlign: 'center' }]}>Calma!</Text>
                    </View>

                    <View style={[gStyles.lockerInfo, { padding: 20 }]}>
                        <View style={[{ flex: 1, alignSelf: 'center' }]}>
                            <Text style={[gStyles.smallSubtitle, { textAlign: 'center' }]}>Tem certeza que deseja voltar para tela de login?</Text>
                        </View>
                        <View style={gStyles.line} />
                        <View style={[gStyles.lineInfo, { padding: 10, paddingRight: 45 }]}>
                            <TouchableOpacity style={[gStyles.linkContainer, { alignSelf: 'flex-start' }]} onPress={() => setAlertV(false)}>
                                <Text style={gStyles.linkText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[gStyles.linkContainer, { alignSelf: 'flex-end' }]} onPress={() => navigation.navigate('Login', { passEmail: email })}>
                                <Text style={gStyles.linkText}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </Modal>

            <View style={[styles.container]}>
                <View style={[styles.header, { backgroundColor: studentLocker == null ? '#D1D1D1' : studentLocker.section.color }]}>

                    {
                        loadingLocker
                            ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color="black" />
                                </View>
                            )
                            : (
                                <>
                                    <TouchableOpacity onPress={() => { navigation.navigate('ConfigurationScreen'); }} activeOpacity={0.8} style={styles.imageU2}>
                                        <MaterialIcons
                                            name="settings"
                                            size={28}
                                        />
                                    </TouchableOpacity>

                                    <View style={styles.user}>
                                        <Image style={styles.imageU} source={!user.profile_picture_url ? DefaultProfilePicture : { uri: user.profile_picture_url }} />

                                        <View style={styles.textContainer}>
                                            <Text style={styles.firstName}>{!user.ra ? 'Nome Sobrenome' : `${user.first_name} ${user.last_name}`}</Text>
                                            <Text style={styles.lastName}>{!user.ra ? 'clXXXXXX@g.unicamp.br' : user.email}</Text>
                                        </View>
                                    </View>
                                </>
                            )
                    }

                </View>

                <View style={styles.body}>

                    <View style={styles.yourLocker}>
                        <Text style={styles.title}>Meu Armário</Text>
                        <View style={[gStyles.line, { marginTop: 10 }]} />

                        {
                            // eslint-disable-next-line no-nested-ternary
                            loadingLocker ? (
                                <View style={{ marginTop: 35, alignSelf: 'center' }}>
                                    <ActivityIndicator size="large" color="black" />
                                </View>
                            )
                                : user.locker_number ? (
                                    <TouchableOpacity onPress={() => anStart()} style={styles.lockerContainer}>
                                        <View style={styles.lockerContainer2}>

                                            <View style={[styles.lockerImageContainer, { backgroundColor: studentLocker == null ? '' : studentLocker.section.color }]}>
                                                <Image source={LockerImage} style={styles.lockerImage} />
                                            </View>

                                            <View style={styles.smallTextContainer}>
                                                <Text style={styles.smallTitle}>Armário {studentLocker == null ? '000' : studentLocker.number}</Text>
                                                <Text style={[styles.smallSubtitle, { color: '#535353' }]}>{studentLocker == null ? 'Alugado em dia/mês/ano' : `Alugado em ${studentLocker.rentedAt.split('-', 2)[0]}`}</Text>
                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                ) : (

                                    <View style={styles.nolockerContainer}>
                                        <Image style={styles.image} source={NoLockersFounded} />
                                        <Text style={styles.text}>Nenhum armário alugado</Text>
                                    </View>
                                )
                        }
                    </View>
                </View>
                <View style={[gStyles.buttonContainer, { paddingHorizontal: '10%' }]}>
                    <Button press={() => { navigation.navigate('RentLockerScreen'); }}>
                        <Text style={gStyles.textButton}>Alugar um Armário</Text>
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
