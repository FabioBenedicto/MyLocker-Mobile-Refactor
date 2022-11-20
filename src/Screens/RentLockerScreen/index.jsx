/* eslint-disable react/no-unstable-nested-components */
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, BackHandler, Dimensions, FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { CaretLeft } from 'phosphor-react';
import LockerContainerBlue from '../../assets/LockerContainerBlue.png';
import LockerContainerGreen from '../../assets/LockerContainerGreen.png';
import LockerContainerRed from '../../assets/LockerContainerRed.png';
import LockerContainerYellow from '../../assets/LockerContainerYellow.png';
import LockerImage from '../../assets/LockerImage.png';
import Button from '../../components/Button';
import gStyles from '../../components/gStyles';
import Loading from '../../components/Loading';
import useLocker from '../../hooks/useLocker';
import api from '../../services/api';
import styles from './styles';
import DEFAULT from '../../theme/default';
import appSyles from '../../styles/appStyles';
import useDarkTheme from '../../hooks/useDarkTheme';
import DARK from '../../theme/dark';
import LIGHT from '../../theme/light';

export default function LockersMap() {
    const navigation = useNavigation();
    const [mapLocker, setMapLocker] = useState([
        [
            { key: '15', type: true, data: 'Sala 2', flor: 1 },
            { key: '16', type: false, data: LockerContainerGreen, pressFunc: () => { setSectionChoosed(6); } },
            { key: '17', type: true, data: 'Sala 3', flor: 1 },
            { key: '18', type: 'line' },
            { key: '19', type: true, data: 'Vestiário Masculino', flor: 1 },
            { key: '20', type: false, data: LockerContainerBlue, pressFunc: () => { setSectionChoosed(7); } },
            { key: '21', type: true, data: 'Sala 4', flor: 1 },
            { key: '22', type: false, data: LockerContainerBlue, pressFunc: () => { setSectionChoosed(8); } },
            { key: '23', type: true, data: 'Sala 5', flor: 1 },
        ],
        [{ key: '1', type: true, data: 'Sala 10', flor: 2 },
            { key: '2', type: false, data: LockerContainerYellow, pressFunc: () => { setSectionChoosed(1); } },
            { key: '3', type: true, data: 'Sala 11', flor: 2 },
            { key: '4', type: false, data: LockerContainerYellow, pressFunc: () => { setSectionChoosed(2); } },
            { key: '5', type: true, data: 'Sala 12', flor: 2 },
            { key: '6', type: 'line' },
            { key: '7', type: true, data: 'Saúde', flor: 2 },
            { key: '8', type: false, data: LockerContainerRed, pressFunc: () => { setSectionChoosed(3); } },
            { key: '9', type: true, data: 'Sala 13', flor: 2 },
            { key: '10', type: false, data: LockerContainerRed, pressFunc: () => { setSectionChoosed(4); } },
            { key: '11', type: true, data: 'Sala 14', flor: 2 },
            { key: '12', type: false, data: LockerContainerRed, pressFunc: () => { setSectionChoosed(5); } },
            { key: '13', type: true, data: 'Sala 15', flor: 2 },

        ],
    ]);
    const [lockers, setLockers] = useState([]);
    const [sectionChoosed, setSectionChoosed] = useState(0);
    const [lockersSectionChoosed, setLockersSectionChoosed] = useState([]);
    const [lockersSectionChoosedOrdened, setLockersSectionChoosedOrdened] = useState([]);
    const [selectedLocker, setSelectedLocker] = useState(null);
    const [navText, setNavText] = useState(['null', 'null']);
    const [lockersReady, setLockersReady] = useState(false);
    const [sizeLockersLine, setSizeLockersLine] = useState(0);
    const [arrowLeftEnabled, setArrowLeftEnabled] = useState(false);
    const [arrowRightEnabled, setArrowRightEnabled] = useState(false);
    const [endPages, setEndPages] = useState(0);
    const [page, setPage] = useState(0);
    const [lockersPage, setLockersPage] = useState([]);
    const [modV, setModV] = useState([false]);
    const [lockerModal, setLockerModal] = useState({});
    const [howManyPages, setHowManyPages] = useState(0);
    const { locker, setLocker } = useLocker();
    const [floor, setFloor] = useState(1);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [arrowLeftFloorEnabled, setArrowLeftFloorEnabled] = useState(false);
    const [arrowRightFloorEnabled, setArrowRightFloorEnabled] = useState(false);
    const { width, height } = Dimensions.get('window');
    const anV = useRef(new Animated.ValueXY({ x: 0, y: height })).current;
    const darkTheme = useDarkTheme();

    const loadLockers = async () => {
        api
            .get('/lockers')
            .then((response) => {
                setLockers(response.data);
            })
            .catch((err) => {
                Alert.alert('', err.response.data.erro);
            });
    };

    const loadSection = () => {
        const lockersSection = [];
        lockers.forEach((element) => {
            if (element.FK_section_id == sectionChoosed) {
                lockersSection.push(element);
            }
        });

        const lockersSectionSplited = [];
        let i = 0;
        let times = 0;
        let sum = 1;
        while (i < lockersSection.length) {
            if (times > 0) {
                times = 0;
                sum = 7;
            } else {
                sum = 1;
                times++;
            }
            const sliced = [];
            if (!(i + 6 > lockersSection.length)) {
                for (let i2 = i; i2 <= i + 6; i2 += 2) {
                    sliced.push(lockersSection[i2]);
                }
            }
            if (sliced == undefined) {
                break;
            }
            lockersSectionSplited.push(sliced);
            i += sum;
        }

        const newArray = [];
        let cont = 0;
        let start = 0;
        while (cont < Math.ceil(lockersSectionSplited.length / 4)) {
            start = cont * 4;
            newArray.push(lockersSectionSplited.slice(start, start + 4));
            cont++;
        }
        console.log(newArray);
        setLockersSectionChoosedOrdened(newArray);
    };

    const backAction = () => {
        if (sectionChoosed <= 0) {
            navigation.navigate('ProfileScreen');
        } else {
            setSectionChoosed(0);
        }
        return true;
    };

    useEffect(() => {
        loadLockers();
        setLockersReady(true);
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    useEffect(() => {
        loadSection();
        setPage(0);
        if (sectionChoosed == 0) {
            navigation.setOptions({
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
        } else {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { setSectionChoosed(0); }} activeOpacity={0.8}>
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={52}
                            color={DEFAULT.COLORS.WHITE}
                        />
                    </TouchableOpacity>
                ),
            });
        }
    }, [sectionChoosed]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [lockersSectionChoosed]);

    useEffect(() => {
        setHowManyPages(lockersSectionChoosedOrdened.length - 1);
    }, [lockersSectionChoosedOrdened]);

    useEffect(() => {
        if (howManyPages > 0) {
            setPageLoaded(true);
        }
    }, [howManyPages]);

    useEffect(() => {
        console.log('ME CHAMOU');
        console.log(howManyPages);
        if (page > 0) {
            setArrowLeftEnabled(true);
        } else {
            setArrowLeftEnabled(false);
        }
        if (page < howManyPages) {
            setArrowRightEnabled(true);
        } else {
            setArrowRightEnabled(false);
        }
    }, [page, howManyPages]);

    useEffect(() => {
        if (floor > 1) {
            setArrowLeftFloorEnabled(true);
        } else {
            setArrowLeftFloorEnabled(false);
        }
        if (floor < 2) {
            setArrowRightFloorEnabled(true);
        } else {
            setArrowRightFloorEnabled(false);
        }
    }, [floor]);

    let auxAvalible = { backgroundColor: '#4ECB71' };

    const modal = (item) => {
        setModV(true);
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
            if (lockerModal.available) {
                auxAvalible = { backgroundColor: '#4ECB71' };
            } else {
                auxAvalible = { backgroundColor: '#FF7B7B' };
            }
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

    /* function spliceIntoChunks(array, pageFunction) {
        console.log('teste');
        // ta recebendo array certo
        console.log(array);
        let result = [];
        const inicio = pageFunction * 4;
        // page começa em 0 mas soma 1 na interface
        result = array.slice(inicio, inicio + 4);
        console.log('teste splice');
        console.log(result);
        setLockersPage(result);
    } */

    const go = () => {
        console.log('go');
        console.log(page);
        console.log(endPages);
        if (page < howManyPages) { setPage(page + 1); }
    };

    const back = () => {
        console.log('back');
        if (page > 0) { setPage(page - 1); }
    };

    const goFloor = () => {
        if (floor < 2) { setFloor(floor + 1); }
    };

    const backFloor = () => {
        if (floor > 1) { setFloor(floor - 1); }
    };

    return (
        <View style={appSyles.container}>
            <Modal visible={modV} transparent animationType="none">
                <TouchableOpacity style={gStyles.background} onPress={() => setModV(false)} />
                <Animated.View style={[gStyles.modalContainer, anV.getLayout()]}>
                    <View>

                        <View>
                            <Text style={[gStyles.smallTitle, { textAlign: 'center' }]}>Armário {lockerModal.number}</Text>
                        </View>

                        <View style={gStyles.lockerInfo}>

                            <View style={[gStyles.lineInfo]}>
                                <Text style={gStyles.smallSubtitle}>Andar:</Text>
                                <Text style={[gStyles.smallSubtitle, { color: '#535353' }]}>Segundo</Text>
                            </View>

                            <View style={gStyles.lineInfo}>
                                <Text style={gStyles.smallSubtitle}>Cor:</Text>
                                <View style={styles.colorContent}>
                                    <Text style={[gStyles.smallSubtitle, { color: '#535353' }]}>sei la como faze a cor por ext</Text>
                                    <View style={[gStyles.color, { backgroundColor: lockerModal.color }]} />
                                </View>
                            </View>

                            <View style={gStyles.lineInfo}>
                                <Text style={gStyles.smallSubtitle}>À esquerda:</Text>
                                <Text style={[gStyles.smallSubtitle, { color: '#535353' }]}>Saúde</Text>
                            </View>

                            <View style={gStyles.lineInfo}>
                                <Text style={gStyles.smallSubtitle}>À direita:</Text>
                                <Text style={[gStyles.smallSubtitle, { color: '#535353' }]}>Sala 13</Text>
                            </View>

                            <View style={gStyles.lineInfo}>
                                <Text style={gStyles.smallSubtitle}>Situação:</Text>
                                <View style={styles.colorContent}>
                                    <Text style={[gStyles.smallSubtitle, { color: '#535353' }]}>Disponível</Text>
                                    <View style={[gStyles.color, auxAvalible]} />
                                </View>
                            </View>

                        </View>

                    </View>

                    <Button press={() => { setLocker(lockerModal); navigation.navigate('PaymentScreen'); }}>
                        {
                            !lockerModal.isRented
                                ? <Text>Alugar</Text>
                                : <Text>Armário já alugado</Text>
                        }
                    </Button>

                </Animated.View>

            </Modal>

            {
                // eslint-disable-next-line no-nested-ternary
                !sectionChoosed
                    ? (
                        lockers.length == 0 ? <Loading />
                            : (
                                <>

                                    <View style={{ marginTop: 20 }}>
                                        <View View style={[gStyles.textContainer]}>
                                            <Text style={[gStyles.title, darkTheme ? { color: DARK.COLORS.PRIMARY_TEXT } : { color: LIGHT.COLORS.PRIMARY_TEXT }]}>Alugue um Armário</Text>
                                            <Text style={[gStyles.subtitle, darkTheme ? { color: DARK.COLORS.SECONDARY_TEXT } : { color: LIGHT.COLORS.SECONDARY_TEXT }]}>Selecione o bloco que você deseja</Text>
                                        </View>
                                    </View>

                                    <FlatList
                                        style={[styles.flatlist]}
                                        data={mapLocker[floor - 1]}
                                        renderItem={({ item }) => {
                                            if (item.type == 'line') {
                                                return (<View style={[gStyles.line, styles.line, darkTheme ? { borderBottomColor: DEFAULT.COLORS.WHITE } : { borderBottomColor: DEFAULT.COLOR.BLACK }]} />);
                                            }

                                            if (item.type) {
                                                return (<Text style={[gStyles.title, styles.flatData, darkTheme ? { color: DARK.COLORS.PRIMARY_TEXT } : {}]}> {item.data} </Text>);
                                            }
                                            return (<TouchableOpacity onPress={item.pressFunc} style={styles.flatDataL}><Image source={item.data} style={styles.lockerImage} resizeMode="contain" /></TouchableOpacity>);
                                        }}
                                    />

                                    <View style={styles.navLockers}>
                                        <TouchableOpacity onPress={backFloor} disabled={!arrowLeftFloorEnabled}>
                                            <MaterialIcons
                                                name="keyboard-arrow-left"
                                                color={arrowLeftFloorEnabled ? darkTheme ? DEFAULT.COLORS.WHITE : DEFAULT.COLORS.BLACK : '#7D7B7B'}
                                                size={64}
                                            />
                                        </TouchableOpacity>

                                        <Text style={[gStyles.title, darkTheme ? { color: DARK.COLORS.PRIMARY_TEXT } : { color: LIGHT.COLORS.PRIMARY_TEXT }]}>{floor}º Andar</Text>

                                        <TouchableOpacity onPress={() => { goFloor(); console.log(floor); }} disabled={!arrowRightFloorEnabled}>
                                            <MaterialIcons
                                                name="keyboard-arrow-right"
                                                color={arrowRightFloorEnabled ? darkTheme ? DEFAULT.COLORS.WHITE : DEFAULT.COLORS.BLACK : '#7D7B7B'}
                                                size={64}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )
                    )
                    : (
                        <>
                            <View style={{ marginTop: 20 }}>
                                <View View style={gStyles.textContainer}>
                                    <Text style={[gStyles.title, darkTheme ? { color: DARK.COLORS.PRIMARY_TEXT } : { color: LIGHT.COLORS.PRIMARY_TEXT }]}>Alugue um Armário</Text>
                                    <Text style={[gStyles.subtitle, darkTheme ? { color: DARK.COLORS.SECONDARY_TEXT } : { color: LIGHT.COLORS.SECONDARY_TEXT }]}>Selecione o armário que você deseja.</Text>
                                </View>
                            </View>

                            <FlatList
                                style={[styles.flatlist]}
                                data={lockersSectionChoosedOrdened[page]}
                                columnWrapperStyle={styles.row}
                                key="_"
                                numColumns={4}
                                renderItem={({ item }) => (
                                    <View>
                                        <TouchableOpacity onPress={() => { anStart(); setLockerModal(item[0]); console.log(arrowRightEnabled); }} style={styles.flatData}>
                                            <Image source={LockerImage} style={[styles.lockerImageL, { backgroundColor: item[0].section.color }]} resizeMode="contain" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { anStart(); setLockerModal(item[1]); }} style={styles.flatData}>
                                            <Image source={LockerImage} style={[styles.lockerImageL, { backgroundColor: item[1].section.color }]} resizeMode="contain" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { anStart(); setLockerModal(item[2]); }} style={styles.flatData}>
                                            <Image source={LockerImage} style={[styles.lockerImageL, { backgroundColor: item[2].section.color }]} resizeMode="contain" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { anStart(); setLockerModal(item[3]); }} style={styles.flatData}>
                                            <Image source={LockerImage} style={[styles.lockerImageL, { backgroundColor: item[3].section.color }]} resizeMode="contain" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                            <View style={styles.navLockers}>
                                <TouchableOpacity onPress={back} disabled={!arrowLeftEnabled}>
                                    <MaterialIcons
                                        name="keyboard-arrow-left"
                                        color={arrowLeftEnabled ? '#000000' : '#7D7B7B'}
                                        size={64}
                                    />
                                </TouchableOpacity>
                                <Text style={gStyles.title}>{page + 1}</Text>
                                <Text style={gStyles.title}> / </Text>
                                <Text style={gStyles.title}>{howManyPages + 1}</Text>

                                <TouchableOpacity onPress={go} disabled={!arrowRightEnabled}>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        color={arrowRightEnabled ? '#000000' : '#7D7B7B'}
                                        size={64}
                                    />
                                </TouchableOpacity>
                            </View>
                        </>
                    )
            }
        </View>
    );
}
