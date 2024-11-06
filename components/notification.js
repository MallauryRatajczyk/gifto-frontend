import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation
const { formatDateToUserReadable } = require('../modules/getDate');

export default function Notification(props) {
    const navigation = useNavigation(); // Obtenir l'objet navigation
    const [itemName, setItemName] = useState("");
    const [isPending, setIsPending] = useState(props.statut === "pending");
    const [interlocuteur, setInterlocuteur] = useState("");
    const [dotStyle, setDotStyle] = useState("");
    const user = useSelector((state) => state.user.value);
    useEffect(() => {
        async function findItem(id) {
            const fetched = await fetch(`http://192.168.1.81:3000/item/${id}`);
            const response = await fetched.json();
            setItemName(response.item.name);
        }
        findItem(props.item);
        async function getUsername(id) {
            const fetchedID = await fetch(`http://192.168.1.81:3000/users/${id}`);
            const responseId = await fetchedID.json();
            return responseId.user.username;
        }
        getUsername(props.interlocuteur).then(username => setInterlocuteur(username));
        if (props.type === "Donner") {
            setDotStyle(styles.dotDonner);
        } else if (props.type === "Recevoir") {
            setDotStyle(styles.dotRecevoir);
        } else if (props.type === "Troquer") {
            setDotStyle(styles.dotTroc)
        }
    }, []);

    //arret vendredi
    const isRead = () => {
        if (props.statut === "pending") {
            const data = { possesseur: props.possesseur, demandeur: props.demandeur, statut: 'read', token: user.token }
            setIsPending(false);
            fetch(`http://192.168.1.81:3000/demande/read/${props.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
        }

        //navigation.navigate('Chat', { message: props.message, interlocuteur })
        navigation.navigate('Demande')
    }

    const unread = () => {
        if (props.statut === "read") {
            const data = { possesseur: props.possesseur, demandeur: props.demandeur, statut: 'pending', token: user.token }
            setIsPending(true);
            fetch(`http://192.168.1.81:3000/demande/read/${props.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={isRead} onLongPress={unread} delayLongPress={200}>
            <View style={isPending ? styles.box : styles.boxRead}>
                <View style={isPending ? dotStyle : styles.dotRead} />
                <Text style={isPending ? styles.title : styles.titleRead}>
                    {itemName.toUpperCase()}
                </Text>
                <Text style={isPending ? styles.date : styles.dateRead}>
                    {formatDateToUserReadable(new Date(props.date))}
                </Text>
                <Text style={isPending ? styles.text : styles.textRead}>
                    {props.lastMessage}
                </Text>
                <Text style={isPending ? styles.type : styles.typeRead}>
                    {props.type}
                </Text>
                <Text style={isPending ? styles.interlocuteur : styles.interlocuteurRead}>
                    {interlocuteur}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        flex: 1,
    },
    box: {
        width: 324,
        height: 60,
        backgroundColor: 'white',
        shadowColor: '#DCE5F2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 54,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    boxRead: {
        width: 324,
        height: 60,
        backgroundColor: 'white',
        shadowColor: '#DCE5F2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 54,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        opacity: 0.5,
    },
    dotRecevoir: {
        width: 10.25,
        height: 10,
        backgroundColor: '#00BA88',
        borderRadius: 9999,
        position: 'absolute',
        left: 22.55,
        top: 21,
    },
    dotRead: {
        width: 10.12,
        height: 10,
        backgroundColor: '#262B37',
        borderRadius: 9999,
        position: 'absolute',
        left: 22.55,
        top: 21,
        opacity: 0.1,
    },
    dotTroc: {
        width: 10.25,
        height: 10,
        backgroundColor: '#8B85EF',
        borderRadius: 9999,
        position: 'absolute',
        left: 22.55,
        top: 21,
    },
    dotDonner: {
        width: 10.25,
        height: 10,
        backgroundColor: '#F08784',
        borderRadius: 9999,
        position: 'absolute',
        left: 22.55,
        top: 21,
    },
    title: {
        position: 'absolute',
        left: 48.60,
        top: 16,
        color: '#262B37',
        fontSize: 16,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '500',
        lineHeight: 16,
    },
    titleRead: {
        position: 'absolute',
        left: 48.60,
        top: 16,
        color: '#262B37',
        fontSize: 16,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '500',
        lineHeight: 16,
    },
    date: {
        position: 'absolute',
        left: 48.60,
        top: 45,
        color: '#262B37',
        fontSize: 14,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '200',
        lineHeight: 16,
    },
    dateRead: {
        position: 'absolute',
        left: 48.60,
        top: 45,
        color: '#262B37',
        fontSize: 14,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '200',
        lineHeight: 16,
        opacity: 0.5,
    },
    text: {
        position: 'absolute',
        left: 48.60,
        top: 32,
        color: '#262B37',
        fontSize: 14,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '200',
        lineHeight: 16,
    },
    textRead: {
        position: 'absolute',
        left: 48.60,
        top: 32,
        color: '#262B37',
        fontSize: 14,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '200',
        lineHeight: 16,
        opacity: 0.5,
    },
    type: {
        position: 'absolute',
        left: 241,
        top: 18,
        opacity: 0.5,
        textAlign: 'right',
        color: '#262B37',
        fontSize: 12,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '400',
        lineHeight: 14,
    },
    typeRead: {
        position: 'absolute',
        left: 241,
        top: 18,
        opacity: 0.5,
        textAlign: 'right',
        color: '#262B37',
        fontSize: 12,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '400',
        lineHeight: 14,
    },
    interlocuteur: {
        position: 'absolute',
        left: 241,
        top: 40,
        opacity: 0.5,
        textAlign: 'right',
        color: '#262B37',
        fontSize: 12,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '400',
        lineHeight: 14,
    },
    interlocuteurRead: {
        position: 'absolute',
        left: 241,
        top: 40,
        opacity: 0.5,
        textAlign: 'right',
        color: '#262B37',
        fontSize: 12,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '400',
        lineHeight: 14,
    },
});
