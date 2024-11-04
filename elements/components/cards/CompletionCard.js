import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import { RocketIcon } from '../../assets/Icons';

const CompletionCard = ({
  visible,
  onClose,
  iconColor = Colors.purpleColor,
  title = 'Completion!',
  navigation,
  navigateTo = 'NextScreen',
  duration = 2000, 
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
        if (navigation && navigateTo) {
          navigation.navigate(navigateTo);
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Dark Overlay */}
      <View style={styles.overlay}>
        {/* Card */}
        <View style={[GlobalStyles.whiteContainer, styles.card]}>
          {/* Icon */}
          <RocketIcon width={50} height={50} color={iconColor} />
          {/* Title */}
          <Text style={GlobalStyles.subtitleTextBlack}>{title}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default CompletionCard;
