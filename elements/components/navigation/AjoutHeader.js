import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  backButtonColor, // New prop to customize back button color
}) {
  return (
    <View style={[styles.headerContainer, { backgroundColor }]}>
      {showBackButton && (
        <BackButton
          iconColor={backButtonColor || iconColor}
          style={styles.backButton}
        />
      )}

      {Icon && (
        <Icon
          width={40}
          height={40}
          color={iconColor}
          style={{ marginRight: 10 }}
        />
      )}

      <Text style={[GlobalStyles.headerTextWhite, { color: textColor }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    ...GlobalStyles.coloredHeader,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    marginRight: 10,
  },
});
 