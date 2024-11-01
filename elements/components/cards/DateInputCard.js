//Amir will retouch it in the future

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
  const [show, setShow] = useState(false); // Controls date picker visibility

  // Toggles the date picker visibility
  const toggleShow = () => {
    setShow(!show);
  };

  // Handles the date selection
  const changeDate = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || value;
      onChange(currentDate); // Passes the selected date back to parent component
      if (Platform.OS === 'android') {
        setShow(false); // Closes the date picker on Android
      }
    } else {
      setShow(false); // Closes the date picker if user cancels
    }
  };

  return (
    <View>
      {/* Title and Date Input */}
      <TouchableOpacity onPress={toggleShow}>
        <InputCard
          title={title}
          value={value ? value.toLocaleDateString() : ''}
          placeholder={placeholder}
          editable={false} // Prevents keyboard from opening
          pointerEvents="none"
        />
      </TouchableOpacity>

      {/* Date Picker */}
      {show && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={value || new Date()}
          onChange={changeDate}
          style={{ backgroundColor: Colors.whiteColor }}
        />
      )}
    </View>
  );
};

export default DateInputCard;
