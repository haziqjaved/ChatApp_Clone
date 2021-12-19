import React,{useState,useCallback,useEffect} from 'react'
import { Image,Text, StyleSheet,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import {
    Dashboard,Login,
    SignUp,users,
    ChatScreen}  from '../views/index' 

export default function MainNavigation(){
  const auth= getAuth()
  const [user,setUser]=useState()
  useEffect(() => {
    onAuthStateChanged(auth,user=>{
      setUser(user)
    })
  }, [user])
    return (
        <NavigationContainer>
          {user ?
            <DashboardStack />
            :
            <AuthStack  />
          }
        </NavigationContainer>
      );
}
function AuthStack() {
    return <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />

    </Stack.Navigator>
}
  
  function DashboardStack() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }} 
      screenOptions={{
        tabBarShowLabel:false,
        style:{
          position:'absolute',
          bottom:25,
          left:20,
          right:20,
          elevation:0,backgroundColor:'#ffffff',
          borderRadius:15,
          height:90,
        ...styles.shadow
        }
          }} >
      <Tab.Screen name="dashboard" component={Dashboard} options={{tabBarIcon:({focused})=>
      (
        <View>
          <Image
          source={require('../assests/icon/chat.png')}
          resizeMode='contain'
          style={{
            width:25,
            height:25,
            left:12,
            tintColor: focused ? '#e32f45':'#748c94'
          }}
          />
          <Text style={{color: focused ? '#e32f45':'#748c94',fontSize:12}}>All Chats</Text>
        </View>
      )
      }}
       />
      <Tab.Screen name="AllUser" component={users} options={{tabBarIcon:({focused})=>
      (
        <View>
          <Image
          source={require('../assests/icon/users.png')}
          resizeMode='contain'
          style={{
            width:30,
            height:25,
            left:12,
            tintColor: focused ? '#e32f45':'#748c94'
          }}
          />
          <Text style={{color: focused ? '#e32f45':'#748c94',fontSize:12}}>Active User</Text>
        </View>
      )
      }}
       />
         <Tab.Screen name="Screen" component={ChatScreen} options={{tabBarIcon:({focused})=>
      (
        <View>
          <Image
          source={require('../assests/icon/users.png')}
          resizeMode='contain'
          style={{
            width:30,
            height:25,
            left:12,
            tintColor: focused ? '#e32f45':'#748c94'
          }}
          />
          <Text style={{color: focused ? '#e32f45':'#748c94',fontSize:12}}>Chat Screen</Text>
        </View>
      )
      }}
       />
      </Tab.Navigator>
    )
  }
  const styles = StyleSheet.create({
      shadow:{
      shadowColor:'#7F5DF0',
      shadowOffset:{
        width:0,
        height:10,},
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5
   }
});