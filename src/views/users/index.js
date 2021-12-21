import React, { useState, useEffect } from "react";
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
import { getAllUsers, createChatRoom, getChatRoom } from "../../config/firebase";
import { collection, query, where, onSnapshot, getFirestore } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { updateUser } from "../../store/actions/userAction";

export default function Users({ navigation }) {
  const db = getFirestore();
  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  const [name, setName] = useState();
  const [room, setRoom] = useState();

  useEffect(async () => {
    const q = query(collection(db, "chatroom"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setRoom(results);

    });

  }, []);

  const createRoom = async () => {
    const id = await createChatRoom(name);
    console.log(id);
  }

  return (
    <NativeBaseProvider>
      {room && (
        <FlatList
          data={room}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate('message', { item })
              }}
            >
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
                        {item["name"]}
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
      <Input
        placeholder="Create Room"
        w={{
          base: "100%",
          md: "25%",
        }}
        InputRightElement={
          <Button size="xs" rounded="none" w="1/6" h="full" onPress={createRoom} >Create </Button>
        }
        onChangeText={(text) => setName(text)}
      />

      <Button size="sm" onPress={() => dispatch(updateUser())}>
        Log Out
      </Button>
    </NativeBaseProvider>
  );
}

