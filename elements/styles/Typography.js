//expo install @expo-google-fonts/baloo-bhaina-2 expo-font
//yarn add @expo-google-fonts/baloo-bhaijaan-2
//expo install expo-font

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  h1: { //main title
    fontFamily: 'BalooBhaijaan2_700Bold',
    fontSize: 36,
    lineHeight: 28,
  },
  h2: { //secondary title
    fontFamily: 'BalooBhaijaan2_600SemiBold',
    fontSize: 24,
    lineHeight: 24,
  },
  h3: {
    fontFamily: 'BalooBhaijaan2_600SemiBold',
    fontSize: 16,
    lineHeight: 16,
  },
  h4: {
    fontFamily: 'BalooBhaijaan2_500Medium',
    fontSize: 14,
    lineHeight: 14,
  },
  cta: {
    fontFamily: 'BalooBhaijaan2_500Medium',
    fontSize: 20,
    lineHeight: 36,
  },
  paragraphMain: { //main bodycopy font
    fontFamily: 'BalooBhaijaan2_400Regular',
    fontSize: 13,
    lineHeight: 14,
  },
  paragraphSmall: { //for description text
    fontFamily: 'BalooBhaijaan2_400Regular',
    fontSize: 11,
    lineHeight: 11,
  },
  paragraphTiny: {
    fontFamily: 'BalooBhaijaan2_400Regular',
    fontSize: 9.5,
    lineHeight: 10,
  },
});