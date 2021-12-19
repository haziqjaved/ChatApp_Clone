import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { logout } from '../../config/firebase'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { Searchbar } from 'react-native-paper';

export default Dashboard = ({navigation}) => {


    function submit() {
      logout()
    }
    return(<View>
      <Text>Dashboard Screen</Text>

      <Button style={styles.lgBtn}  title='logout' onPress={submit}></Button>
    </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.625,
    },
    lgBtn:{
        marginTop:20
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
  });
