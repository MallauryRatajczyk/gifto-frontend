import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Message = ({ initialMessages = [], myId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (initialMessages.length > 0) {
            const transformedMessages = initialMessages.map((msg) => {
                return {
                    _id: msg.a,                  // ID unique du message
                    text: msg.initialMessages || "Message vide", // Texte du message (ou "Message vide" si vide)
                    createdAt: new Date(msg.date), // Date de création du message
                    user: {
                        _id: msg.de,             // ID de l'utilisateur
                        name: 'User 2'           // Nom de l'utilisateur (ou peut être dynamique)
                    }
                };
            });
            setMessages(transformedMessages); // Met à jour les messages dans l'état
        }
    }, [initialMessages]);

    const onSend = (newMessages = []) => {
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    };

    const renderBubble = (props) => {
        const isCurrentUser = props.currentMessage.user._id === myId;

        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: isCurrentUser ? { backgroundColor: '#8B85EF', padding: 10, margin: 10 } : {},
                    left: !isCurrentUser ? { backgroundColor: '#E0BB26', padding: 10, margin: 10 } : {},
                }}
                textStyle={{
                    right: isCurrentUser ? { color: '#FFFFFF' } : {},
                    left: !isCurrentUser ? { color: '#000000' } : {},
                }}
            />
        );
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
                _id: myId, // Identifiant de l'utilisateur actuel
            }}
            renderBubble={renderBubble}
        />
    );
};

export default Message;
