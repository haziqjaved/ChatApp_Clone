import React, { useEffect,useState} from "react";
import { View} from "react-native";
import {useSelector } from 'react-redux';
import {
    Input,
    Icon,
    Button,
    NativeBaseProvider,
    Center,
    FlatList,
    Box,
    VStack,
    Text,
    Pressable,
    AlertDialog
  } from "native-base";

import {getMessage} from '../../config/firebase';


export default function RecentChats() {
 const [message,setMessage] = useState();
 const {id} = useSelector(state => state.userReducer.user);
  
  useEffect(async () => {
     const data= await getMessage(id);
     setMessage(data);
    console.log(data);
  }, []);

  return(
    <NativeBaseProvider>
   
    {message && (
      <FlatList
        data={message}
        renderItem={({ item }) => (
          <Pressable>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: "gray.600",
                  }}
                  borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2"
                  bg={
                    isPressed ? "dark.600" : isHovered ? "dark.600" : "white"
                  }
                >
                  <VStack>
                  <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.senderDetails.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.temparr[0]}
                </Text>
                   
                  </VStack>
                </Box>
              );
            }}
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        width="100%"
      />
    )}
    </NativeBaseProvider>);
}
