import React, { useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputCard from './InputCard'; 
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const DateInputCard = ({
  title,
  value,
  onChange,
  placeholder = 'Date de naissance',
}) => {
  const [show, setShow] = useState(false);

  // Handles the date selection
  const changeDate = (event, selectedDate) => {
    setShow(false); // Always close the picker
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate); // Update the date only if a date was selected
    }
  };

  const getFormattedDate = () => {
    if (!value) return '';
    try {
      return value.toLocaleDateString();
    } catch (error) {
      return '';
    }
  };

  return (
    <View style={{ marginVertical: 0, padding: 0 }}>
      <TouchableOpacity 
        onPress={() => setShow(true)}
        activeOpacity={0.7}
        style={{
          borderRadius: 10,
          margin: 0,
          padding: 0,
        }}
      >
        <InputCard
          title={title}
          value={getFormattedDate()}
          placeholder={placeholder}
          editable={false}
          pointerEvents="none"
          inputProps={{
            placeholderTextColor: Colors.textColor,
            style: { 
              color: value ? GlobalStyles.textColor : Colors.textColor,
              backgroundColor: 'transparent',
            }
          }}
          style={{
            margin: 0,
            padding: 0,
          }}
        />
      </TouchableOpacity>

      {/* Date Picker */}
      {show && (
        <View style={{
          backgroundColor: Colors.whiteColor,
          color: Colors.redColor,
          borderRadius: 10,
          marginTop: 10,
          overflow: 'hidden'
        }}>
          <DateTimePicker
            mode="date"
            display="spinner"
            value={value || new Date()}
            onChange={changeDate}
            style={{ backgroundColor: Colors.whiteColor }}
            themeVariant="light"
            textColor={Colors.textColor}
          />
        </View>
      )}
    </View>
  );
};

export default DateInputCard;
