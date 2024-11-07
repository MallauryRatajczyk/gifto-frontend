// ChatPage.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Utilisé pour récupérer la navigation

const BACKEND_ADDRESS =process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function ChatPage() {
    const route = useRoute(); // Pour récupérer les props passées lors de la navigation
    const navigation = useNavigation(); // Pour gérer la navigation
    const { initialMessages, interlocuteur, idInterlocuteur, myId } = route.params; // Messages, interlocuteur, etc.
    const [messages, setMessages] = useState(initialMessages || []);
    const [newMessage, setNewMessage] = useState("");

    // Fonction pour envoyer un nouveau message
    const sendMessage = async () => {
        if (newMessage.trim()) {
            // Ajout du message localement
            const messageData = {
                message: newMessage,
                date: new Date().toISOString(),
                sender: myId,
                receiver: idInterlocuteur,
            };

            setMessages([...messages, { ...messageData, createdAt: new Date() }]);

            // Envoi du message au serveur
            try {
                await fetch("${BACKEND_ADDRESS}/messages", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageData),
                });
            } catch (error) {
                console.error("Error sending message:", error);
            }

            setNewMessage(""); // Réinitialise le champ de texte
        }
    };

    return (
        <View style={styles.container}>
            {/* Bouton de retour */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>← Retour</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Chat avec {interlocuteur}</Text>

            {/* Liste des messages */}
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={item.sender === myId ? styles.myMessage : styles.theirMessage}>
                        <Text style={styles.messageText}>{item.message}</Text>
                        <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                inverted // Inverser la liste pour afficher les derniers messages en bas
            />

            {/* Champ de texte et bouton pour envoyer un message */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Tapez un message..."
                    placeholderTextColor="#B5B5B5"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Envoyer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#F7F9FB', // Couleur de fond douce
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    backButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#4B88D1', // Couleur plus douce pour le bouton de retour
        borderRadius: 25,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 20,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        padding: 12,
        borderRadius: 20,
        marginBottom: 10,
        maxWidth: '80%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Ombrage pour le message
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
        padding: 12,
        borderRadius: 20,
        marginBottom: 10,
        maxWidth: '80%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Ombrage pour le message
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        fontSize: 16,
        color: '#333',
        marginRight: 10,
        height: 45,
    },
    sendButton: {
        backgroundColor: '#4B88D1', // Couleur du bouton d'envoi
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
});
