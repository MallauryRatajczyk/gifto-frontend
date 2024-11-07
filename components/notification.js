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
            try {
                const fetched = await fetch(`http://192.168.1.81:3000/item/${id}`);
                const response = await fetched.json();
                if (response && response.item && response.item.name) {
                    setItemName(response.item.name);
                } else {
                    console.error("Item not found or malformed response", response);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'élément", error);
            }
        }
        findItem(props.item);

        if (props.type === "Donner") {
            setDotStyle(styles.dotDonner);
        } else if (props.type === "Recevoir") {
            setDotStyle(styles.dotRecevoir);
        } else if (props.type === "Troquer") {
            setDotStyle(styles.dotTroc);
        }
    }, []);

    const isRead = () => {
        if (props.statut === "pending") {
            const data = { statut: 'read', token: user.token }
            setIsPending(false);
            fetch(`http://192.168.1.81:3000/demande/read/${props.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        navigation.navigate('Demande');
    }

    const unread = () => {
        if (props.statut === "read") {
            const data = { statut: 'pending', token: user.token }
            setIsPending(true);
            fetch(`http://192.168.1.81:3000/demande/read/${props.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={isRead}
            onLongPress={unread}
            delayLongPress={200}>
            <View style={isPending ? styles.box : styles.boxRead}>
                <View style={isPending ? dotStyle : styles.dotRead} />
                <Text style={isPending ? styles.type : styles.typeRead}>
                    {props.type}
                </Text>
                <View style={styles.textContainer}>
                    <Text style={isPending ? styles.title : styles.titleRead}>
                        {itemName.toUpperCase()}
                    </Text>
                    <Text style={isPending ? styles.date : styles.dateRead}>
                        {formatDateToUserReadable(new Date(props.date))}
                    </Text>

                </View>
                <View style={styles.textContainer}>
                    <Text style={isPending ? styles.text : styles.textRead}>
                        {props.lastMessage}
                    </Text>
                    <Text style={isPending ? styles.interlocuteur : styles.interlocuteurRead}>
                        {interlocuteur}
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#DCE5F2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 10,
    },
    boxRead: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 80,
        backgroundColor: '#F4F4F4',
        borderRadius: 12,
        opacity: 0.5,
        shadowColor: '#DCE5F2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    dotRecevoir: {
        width: 12,
        height: 12,
        backgroundColor: '#00BA88',
        borderRadius: 6,
        marginRight: 12,
    },
    dotRead: {
        width: 12,
        height: 12,
        backgroundColor: '#262B37',
        borderRadius: 6,
        opacity: 0.1,
        marginRight: 12,
    },
    dotTroc: {
        width: 12,
        height: 12,
        backgroundColor: '#8B85EF',
        borderRadius: 6,
        marginRight: 12,
    },
    dotDonner: {
        width: 12,
        height: 12,
        backgroundColor: '#F08784',
        borderRadius: 6,
        marginRight: 12,
    },
    title: {
        color: '#262B37',
        fontSize: 16,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '500',
        marginBottom: 4,
    },
    titleRead: {
        color: '#262B37',
        fontSize: 16,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '500',
        marginBottom: 4,
        opacity: 0.5,
    },
    date: {
        color: '#A2A9B2',
        fontSize: 14,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '200',
    },
    dateRead: {
        color: '#A2A9B2',
        fontSize: 14,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '200',
        opacity: 0.5,
    },
    type: {
        fontSize: 12,
        color: '#A2A9B2',
        fontWeight: '400',
        textAlign: 'right',
        padding: 10,
    },
    typeRead: {
        fontSize: 12,
        color: '#A2A9B2',
        fontWeight: '400',
        textAlign: 'right',
        opacity: 0.5,
        padding: 10,
    },
    text: {
        fontSize: 14,
        color: '#262B37',
        fontWeight: '300',
        marginTop: 4,
    },
    textRead: {
        fontSize: 14,
        color: '#262B37',
        fontWeight: '300',
        marginTop: 4,
        opacity: 0.5,
    },
    interlocuteur: {
        fontSize: 12,
        color: '#A2A9B2',
        fontWeight: '400',
        marginTop: 4,
        textAlign: 'right',
    },
    interlocuteurRead: {
        fontSize: 12,
        color: '#A2A9B2',
        fontWeight: '400',
        marginTop: 4,
        textAlign: 'right',
        opacity: 0.5,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});
