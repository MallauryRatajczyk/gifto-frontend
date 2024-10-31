import { Text, View, Image, StyleSheet } from "react-native";
import { configureFonts, MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Message from './message';


export default function Chat({ route }) {
    console.log('route', route.params)
    const { message } = route.params
    const user = { _id: '671fb98fe3a8ffe9c0ea2697', name: "dupond" };
    const messageSent = { ...message, user }
    return (
        <PaperProvider>
            <Message message={messageSent} />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {}
});