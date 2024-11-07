import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import BackButton from '../buttons/BackButton'; 

export default function AjoutHeader({
    icon: Icon,
    title,
    backgroundColor = Colors.primaryColor,
    textColor = Colors.whiteColor,
    iconColor = Colors.whiteColor,
    showBackButton = false,
    backButtonColor,
    backButtonSize = 24,
    onBackPress,
}) {
    const navigation = useNavigation();

    return (
        <View style={[GlobalStyles.coloredHeader, { 
            backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 30,
            marginBottom: 24,
        }]}>
            <Text style={[GlobalStyles.headerTextWhite, { color: textColor, marginTop: 12 }]}>
                {title}
            </Text>

            {Icon && (
                <Icon
                    width={40}
                    height={40}
                    color={iconColor}
                    style={{ marginRight: 10 }}
                />
            )}

            {showBackButton && (
                <BackButton
                    iconColor={backButtonColor || iconColor}
                    iconSize={backButtonSize}
                    onPress={onBackPress || navigation.goBack}
                    style={{ marginRight: 10 }}
                />
            )}
        </View>
    );
}
