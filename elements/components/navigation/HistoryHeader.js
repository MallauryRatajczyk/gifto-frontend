import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../styles/Colors';
import Typography from '../../styles/Typography';
import GlobalStyles from '../../styles/GlobalStyles';
import { HistoryIcon } from '../../assets/Icons';


export default function HistoryHeader() {
    return (
        <View style={GlobalStyles.blackHeader}>
            <HistoryIcon width={40} height={40} color={Colors.whiteColor} />
            <Text style={GlobalStyles.headerTextWhite}>Historique</Text>
        </View>
    );
}
