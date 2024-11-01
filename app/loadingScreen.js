import { Text, View, Image, StyleSheet } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import Chat from '../components/message';

export default function loadingScreen() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image source={require('../assets/images/logoGifto.png')} style={styles.logo} />
            <PaperProvider>
                <Chat />
            </PaperProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {}
});