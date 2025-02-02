import React from 'react'
import { View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  showStartPicker: boolean;
  startDate: Date;
  onStartDateChange: (args1: any, args2: Date | undefined) => void;
  startOfYear: Date;
  endOfYear: Date;
}

export const DateModal = ({ showStartPicker,
  startDate,
  onStartDateChange,
  startOfYear,
  endOfYear }: Props) => {
  return (
    <View>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onStartDateChange}
          minimumDate={startOfYear}
          maximumDate={endOfYear}
        />
      )}
    </View>
  )
}
