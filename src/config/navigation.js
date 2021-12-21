import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, } from 'react-native';
import {useSelector } from 'react-redux';
import { Image } from 'react-native';
import {Login,SignUp,Message,RecentChats,Users} from '../views/index'



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function MainNavigator() {
    
  const user = useSelector(state => state.userReducer.user)
    return (
      <NavigationContainer>
      {user ?
        <DashboardStack/>
        :
        <AuthStack />
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
  function DashboardStack()
  {
    return <Tab.Navigator  screenOptions={{ tabBarShowLabel:false}}>
    <Tab.Screen name="Users" component={ChatScreens} options={{tabBarIcon:({focused})=>
      (
        <View>
          <Image
          source={require('../assests/icon/users.png')}
          resizeMode='contain'
          style={{
            width:25,
            height:25,
            left:3,
            tintColor: focused ? '#e32f45':'#748c94'
          }}
          />
          <Text style={{color: focused ? '#e32f45':'#748c94',fontSize:12}}>Users</Text>
        </View>
      )
      }} />
    <Tab.Screen name="Recent Chats" component={RecentChats}  options={{tabBarIcon:({focused})=>
      (
        <View>
          <Image
          source={require('../assests/icon/chat.png')}
          resizeMode='contain'
          style={{
            width:25,
            height:25,
            left:18,
            tintColor: focused ? '#e32f45':'#748c94'
          }}
          />
          <Text style={{color: focused ? '#e32f45':'#748c94',fontSize:12}}>Recent Chats</Text>
        </View>
      )
      }} />
  </Tab.Navigator>
  }

  function ChatScreens()
  {
      return (
      <Stack.Navigator >
        <Stack.Screen name="Chats" component={Users} options={{
    headerShown: false}}/>
        <Stack.Screen name="message" component={Message} options={{
    headerShown: false}}/>
      </Stack.Navigator>
    )
  }
