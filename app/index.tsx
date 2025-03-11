import { ImageBackground, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const index = () => {
  function greetBasedOnTime() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning!";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon!";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening!";
    } else {
      return "Good Night!";
    }
  }

  function formatDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Day of the month
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month (0-indexed, so add 1)
    const year = today.getFullYear(); // Full year

    // Return formatted date in the format: YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Coming Soon...',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground
        source={require("../assets/background.jpg")}
        resizeMode='cover'
        style={{ flex: 1, opacity: 0.8 }}
      >

        <View style={{ marginHorizontal: 10 }}>
          <View style={{ height: 200, backgroundColor: "#f5f5dc", borderRadius: 12, borderWidth: 1, marginTop: 40, borderColor: 'grey', paddingTop: 10, paddingLeft: 10 }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{greetBasedOnTime()}</Text>
            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Investor</Text>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10 }}>
              <Text>{formatDate()}</Text>
            </View>

          </View>

          <Text style={{ marginVertical: 20, fontWeight: '600', color: '#ffffff' }}>What do you want to do today?</Text>
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              onPress={showToastWithGravity}
              style={{ paddingVertical: 24, borderRadius: 6, borderWidth: 1, borderColor: 'white', paddingHorizontal: 10, backgroundColor: 'white' }}>
              <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>View Investor Payment Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showToastWithGravity}
              style={{ paddingVertical: 24, borderRadius: 6, borderWidth: 1, marginTop: 4, borderColor: 'white', paddingHorizontal: 10, backgroundColor: 'white' }}>
              <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>View 365 Payment Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingVertical: 24, borderRadius: 6, borderWidth: 1, marginTop: 4, borderColor: 'white', paddingHorizontal: 10, backgroundColor: 'white' }}>
              <Link href={"./homeScreen"}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>View 365 Calender</Text>
              </Link>
            </TouchableOpacity>


          </View>
        </View>
      </ImageBackground >
    </View >
  )
}

export default index

const styles = StyleSheet.create({})