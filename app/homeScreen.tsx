
import { useEffect, useState } from "react";
import { Alert, Pressable, StatusBar, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { DateModal } from "./components/DateModal";
import { endOfYear, formatDate, startOfYear } from "./utils/getFormattedDate";
import * as Clipboard from 'expo-clipboard';

export default function HomeScreen() {
  const [addedDates, setAddedDates] = useState(0)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);


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

  const copyToClipboard = async (item: any) => {
    await Clipboard.setStringAsync(item.toString());
    showToastWithGravity();
  };


  useEffect(() => {
    setAddedDates(sumOfDaysBetween(formatDate(startDate), formatDate(endDate)))
  },
    [startDate, endDate]);

  useEffect(() => {
    const startPriceData = getDayOfYear(formatDate(startDate))
    setStartPrice(startPriceData)
  }, [startDate]);


  useEffect(() => {
    const endPriceData = getDayOfYear(formatDate(endDate))
    setEndPrice(endPriceData)
  }, [endDate])

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


  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Text copied to clipboard!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 40,
        backgroundColor: 'white'
      }}
    >
      <StatusBar barStyle={'light-content'} />

      <View style={{ marginHorizontal: 10, marginTop: 20 }}>
        <View >
          <Text>Start Date</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              style={{ flexDirection: 'row', flex: 1, borderWidth: 1, padding: 8, borderRadius: 6, marginRight: 2, alignItems: 'center' }}
            >
              <AntDesign name="calendar" size={24} color="black" />
              <Text style={{ fontSize: 16, paddingLeft: 4 }}>{startDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <Text
              style={{ textAlign: 'center', justifyContent: 'center', borderWidth: 1, padding: 10, borderRadius: 6, fontSize: 16 }}
              onPress={() => copyToClipboard(startPrice)}
            >Kes. {startPrice}</Text>
          </View>

        </View>


        <View style={{ marginTop: 30 }}>
          <Text>End Date</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setShowEndPicker(true)}
              style={{ flexDirection: 'row', flex: 1, borderWidth: 1, padding: 8, borderRadius: 6, marginRight: 2, alignItems: 'center' }}
            >
              <AntDesign name="calendar" size={24} color="black" />
              <Text style={{ fontSize: 16, paddingLeft: 4 }}>{endDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <Text
              style={{ textAlign: 'center', justifyContent: 'center', borderWidth: 1, padding: 10, borderRadius: 6, fontSize: 16 }}
              onPress={() => copyToClipboard(endPrice)}
            >Kes. {endPrice}</Text>
          </View>
        </View>



      </View>


      <View style={{ marginTop: 30, marginHorizontal: 10 }}>
        <View style={{ padding: 44, backgroundColor: 'grey', borderRadius: 6, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Text>You are to Pay:-</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 64, fontWeight: 'bold' }} >Kes. {addedDates}</Text>
                <TouchableOpacity onPress={() => copyToClipboard(addedDates)}>
                  <AntDesign name="copy1" size={28} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>

              </View>

            </View>
          </View>


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
