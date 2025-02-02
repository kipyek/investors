import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { DateModal } from "./components/DateModal";
import { endOfYear, formatDate, startOfYear } from "./utils/getFormattedDate";

export default function Index() {
  const [addedDates, setAddedDates] = useState(0)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);


  const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    if (currentDate > endDate) {
      Alert.alert("Start date can't be later than end date!");
    } else {
      setStartDate(currentDate);
    }
  };


  const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    if (currentDate < startDate) {
      Alert.alert("End date can't be earlier than start date!");
    } else {
      setEndDate(currentDate);
    }
  };


  useEffect(() => {
    setAddedDates(sumOfDaysBetween(formatDate(startDate), formatDate(endDate)))
  },
    [startDate, endDate])

  function getDayOfYear(date: any) {
    const start: any = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  function sumOfDaysBetween(startsDate: Date, endsDate: Date) {
    const startDay = getDayOfYear(startsDate);
    const endDay = getDayOfYear(endsDate);


    let sum = 0;
    for (let day = startDay; day <= endDay; day++) {
      sum += day;
    }

    return sum;
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
        <View style={{ flex: 0.5 }}>
          <Text>Start Date</Text>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={{ flexDirection: 'row', borderWidth: 1, padding: 8, borderRadius: 6, marginRight: 2, alignItems: 'center' }}
          >
            <AntDesign name="calendar" size={24} color="black" />
            <Text style={{ fontSize: 16, paddingLeft: 4 }}>{startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>


        <View style={{ flex: 0.5 }}>
          <Text>End Date</Text>
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={{ flexDirection: 'row', borderWidth: 1, padding: 8, borderRadius: 6, marginRight: 2, alignItems: 'center' }}
          >
            <AntDesign name="calendar" size={24} color="black" />
            <Text style={{ fontSize: 16, paddingLeft: 4 }}>{endDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>



      </View>


      <View style={{ marginTop: 30 }}>
        <View style={{ padding: 44, backgroundColor: 'grey', borderRadius: 6 }}>
          <Text>You are to Pay:-</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{addedDates}</Text>
        </View>
      </View>

      <DateModal
        showStartPicker={showStartPicker}
        startDate={startDate}
        onStartDateChange={onStartDateChange}
        startOfYear={startOfYear}
        endOfYear={endOfYear}
      />

      <DateModal
        showStartPicker={showEndPicker}
        startDate={endDate}
        onStartDateChange={onEndDateChange}
        startOfYear={startOfYear}
        endOfYear={endOfYear}
      />
    </View>
  );
}
