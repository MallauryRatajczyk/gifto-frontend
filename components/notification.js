import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";;
import { useState } from 'react';
export default function Notification(props) {
    console.log("notification")

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Sac de Louis Vuitton</Text>
                <Text style={styles.date}>11/08/2024</Text>
                <Text style={styles.action}>Donner</Text>
                <View style={styles.dot} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        opacity: 0.5,
        flex: 1
    },
    box: {
        width: 324,
        height: 60,
        position: 'absolute',
        backgroundColor: 'white',
        shadowColor: '#DCE5F2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 54,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    title: {
        position: 'absolute',
        left: 45.56,
        top: 25,
        color: '#262B37',
        fontSize: 16,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '500',
        lineHeight: 16,
    },
    date: {
        position: 'absolute',
        left: 246.04,
        top: 32,
        opacity: 0.5,
        textAlign: 'right',
        color: '#262B37',
        fontSize: 12,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '400',
        lineHeight: 14,
    },
    action: {
        position: 'absolute',
        left: 251,
        top: 15,
        opacity: 0.4,
        textAlign: 'right',
        color: '#262B37',
        fontSize: 16,
        fontFamily: 'Baloo Bhaina 2',
        fontWeight: '500',
        lineHeight: 16,
    },
    dot: {
        width: 10.12,
        height: 10,
        backgroundColor: '#262B37',
        borderRadius: 9999,
        position: 'absolute',
        left: 22.27,
        top: 26,
        opacity: 0.1,
    },
});