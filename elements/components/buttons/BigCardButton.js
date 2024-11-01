import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import Typography from '../../styles/Typography';
import Icon from '../../assets/Icons';


export default function BigCardButton({icon: Icon, iconColor, title, bodyText, onPress, textColor = Colors.blackColor}) {
  return (

    <TouchableOpacity style={GlobalStyles.whiteCardContainer} onPress={onPress}>
      
      <View style={GlobalStyles.CardTextContainer}>
        <Text style={[GlobalStyles.headerTextRed, { color: textColor }]}>{title}</Text>
        <Text style={GlobalStyles.bodyTextBlack}>{bodyText}</Text>
      </View>

      {Icon && <Icon width={58} height={58} color={iconColor} />}
    </TouchableOpacity>   

  );
  
}
