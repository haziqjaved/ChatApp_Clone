import React,{ useState, useEffect } from "react";
import {Text} from "react-native";
import {useSelector } from 'react-redux';
import { messageInChatRoom} from "../../config/firebase";

import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import {
    Input,
    Button,
    NativeBaseProvider,
    Center,
    FlatList,
    Box,
    VStack,
    Pressable,
  } from "native-base";
 const db = getFirestore();

export default function Message({route,navigation})
{
    
  const [value,setValue] = useState();

  const [msg,setMsg] = useState();
  
  const {item} = route.params;
  const {id} = useSelector(state => state.userReducer.user);
  console.log(item);



 
  const message = async() =>{
    await messageInChatRoom(value,item.id,id)
  }
  const handle = (text) => {
    setValue(text);
    
    
  };
    useEffect(async() => {
       onSnapshot(
          doc(db, "chatroom",item.id),
          { includeMetadataChanges: true },
          (doc) => {
  
          // let s = doc.data();
          let {messages}=doc.data()
           messages.sort(function(x, y){
                    return x.timestamp - y.timestamp;
           })
          console.log("i am aranged",messages);
          setMsg(messages)
          }
          );
    }, []);

return(
    <NativeBaseProvider>
        {msg && (
          <FlatList
            data={msg}
            renderItem={({ item }) => (
              <Pressable>
                {({}) => {
                  return (
                    <Box
                      borderBottomWidth="3"
                      _dark={{
                        borderColor: "gray.600",
                      }}
                      borderColor="coolGray.200"
                      pl="6"
                      pr="5"
                      py="2"
                      ml={item["id"] === id ? "190":0}
                      bg="white"
                      rounded="md"
                      width="50%"
                    >
                      <VStack>
                        <Text
                          _dark={{
                            color: "warmGray.50",
                          }}
                          color="coolGray.800"
                          bold
                        >
                          {item.text}
                        </Text>
                        <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                {console.log((item.timestamp).toDate())}
                {((item.timestamp).toDate()).toString()}
                </Text>
                       
                      </VStack>
                    </Box>
                  );
                }}
              </Pressable>
            )}
            keyExtractor={(item) => item.senderid}
            width="100%"
          />
        )}
       
        <Input
        size="xl"
        h="60px"
        mb="7"
        isFullWidth={true}
        onChangeText={handle}
        InputRightElement={
          <Button
            size="md"
            rounded="full"
            w="1/6"
            bg="black"
            onPress={message}
          > GO</Button> 
        }
      
      />
    
      </NativeBaseProvider>
);
}
