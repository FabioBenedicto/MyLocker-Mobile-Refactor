import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LockerImage from '../../assets/LockerImage.png';
import Button from '../../components/Button';
import gStyles from '../../components/gStyles';
import useLocker from '../../hooks/useLocker';
import useUser from '../../hooks/useUser';
import api from '../../services/api';
import styles from './styles';
import DEFAULT from '../../theme/default';
import globalStyles from '../../styles/globalStyles';
import appStyles from '../../styles/appStyles';

export default function PaymentScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useUser();
    const { locker } = useLocker();
    const [alertV, setAlertV] = useState(false);

    const backAction = () => {
        setAlertV(true);
        return true;
    };

    function handleLockerRent() {
        const requestBodyStudent = {
            ra: user.ra,
            lockerNumber: locker.number,
        };

        const requestBodyLocker = {
            lockerNumber: locker.number,
            isRented: 1,
        };

        setLoading(true);

        api.post('/lockers/set-is-rented', requestBodyLocker).catch((err) => {
            // toast.error(err.response.data.erro);
            console.log(err.response.data.erro);
        });

        api
            .post('/students/update-locker-number', requestBodyStudent, {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data);
                // toast.success('Armário alugado com sucesso');
                setLoading(false);
                navigation.navigate('ProfilePage');
                /* setTimeout(() => {
                    toast.dismiss()
                    navigate('/')
                }, 1500) */
            })
            .catch((err) => {
                // toast.error(err.response.data.erro);
                console.log(err.response.data.erro);
            });
    }

    /* useEffect(() => {
        if (locker != null) {
            selectedLockerImgRef.current!.style.backgroundColor = locker.section.color

            colorSpanRef.current!.style.backgroundColor = locker.section.color
        }
    }, []) */

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
        BackHandler.addEventListener('hardwareBackPress', backAction);
        console.log(locker.number);
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
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <View style={[gStyles.textContainer, styles.spacing]}>
                    <Text style={appStyles.title}>Alugue um Armário</Text>
                    <Text style={appStyles.subtitle}>Revise seu pedido e realize o pagamento</Text>
                </View>

                <View style={[styles.lockerContainer, styles.spacing]}>
                    <View style={styles.lockerHeader}>

                        <Image source={LockerImage} style={{ backgroundColor: locker.section.color }} />

                        <View>
                            <Text style={styles.lockerNumber}>Armário {locker.number}</Text>
                            <Text style={styles.lockerPrice}>R$200,00</Text>
                        </View>

                    </View>
                    <View style={gStyles.lockerInfo}>

                        <View>
                            <Text style={gStyles.lockerInfoLabel}>Número:</Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value={locker.number.toString()} editable={false} />
                        </View>

                        <View>
                            <Text style={gStyles.lockerInfoLabel}>Andar:</Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value="" editable={false} />
                        </View>

                        <View>
                            <Text style={gStyles.lockerInfoLabel}>Cor: </Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value={transformHexToPlainText(locker.section.color)} editable={false} />
                        </View>
                        <View>
                            <Text style={gStyles.lockerInfoLabel}>À Esquerda:</Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value={locker.section.left_room.toString()} editable={false} />
                        </View>

                        <View>
                            <Text style={gStyles.lockerInfoLabel}>À Direita:</Text>
                            <TextInput style={[gStyles.lockerInfoinput, gStyles.disabled]} value={locker.section.right_room.toString()} editable={false} />
                        </View>
                    </View>

                </View>

                <View style={styles.priceContainer}>

                    <View style={styles.linePrice}>
                        <Text style={styles.titlePrice}>Subtotal</Text>
                        <Text style={styles.titlePrice}>R$200,00</Text>
                    </View>

                    <View style={styles.linePrice}>
                        <Text style={styles.subtitlePrice}>Desconto APM</Text>
                        <Text style={styles.subtitlePrice}>(50%) - R$100,00</Text>
                    </View>

                    <View style={[gStyles.line, { borderStyle: 'dashed', borderColor: '#B0B0B0' }]} />

                    <View style={styles.linePrice}>
                        <Text style={styles.titlePrice}>Total</Text>
                        <Text style={styles.titlePrice}>R$100,00</Text>
                    </View>

                </View>

                <View style={gStyles.buttonContainer}>
                    <Button press={() => {}} disabled={!!loading}>
                        <View style={{ height: 30 }}>
                            {loading
                                ? <ActivityIndicator size="large" color="white" />
                                : <Text style={gStyles.textButton}>Finalizar Compra</Text>}
                        </View>
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}
