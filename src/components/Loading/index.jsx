import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="#0085FF" size="large" />
        </View>
    );
}
