import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";;

export default function Demandes(props) {
    console.log("demande")
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{props.message}</Text>
            <Text>{props.date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});