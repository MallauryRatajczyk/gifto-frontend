import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen({ route }) {

    const navigation = useNavigation();
    const { interlocuteur, messages: initialMessages } = route.params; // messages initiaux passés par la route
    const [messages, setMessages] = useState([]);
    console.log(messages)

    // Initialisation des messages et cas si message vide
    useEffect(() => {
        if (initialMessages && initialMessages.length > 0) {
            setMessages(initialMessages);
        }
    }, [initialMessages]);

    const onSend = (newMessages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    };


    const settingBubble = () => {
        return (
            <Bubble
                wrapperStyle={{
                    right: { backgroundColor: '#8B85EF', padding: 10, margin: 10 }, // Couleur de fond des messages envoyés
                    left: { backgroundColor: '#E0BB26', padding: 10, margin: 10, }, // Couleur de fond des messages reçus
                }}
                textStyle={{
                    right: { color: '#FFFFFF', }, // Couleur du texte des messages envoyés
                    left: { color: '#000000', }, // Couleur du texte des messages reçus
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Retour</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chat avec {interlocuteur}</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                renderBubble={settingBubble}
                user={{
                    _id: 'userId', // Remplacez par l'ID de l'utilisateur actuel
                }
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: 'blue', // Vous pouvez changer la couleur selon vos préférences
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
