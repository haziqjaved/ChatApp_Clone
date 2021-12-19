import * as React from 'react';
import { View,StyleSheet } from 'react-native';
import MyTabs from './src/config/AllNavigation';
import MainNavigation from './src/config/AllNavigation';
export default function App() {
  return (
    <View style={styles.container}>
      <MyTabs />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 300,
    height: 200
  }
});
