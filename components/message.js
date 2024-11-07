import React, { useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Message = (props) => {
    const [messages, setMessages] = useState([]);

    const onSend = (newMessages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    };

    const renderBubble = () => {
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
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: 1, // Identifiant de l'utilisateur mettre l'id de l'user
            }}
            renderBubble={renderBubble}
        />
    );
};

export default Message;
