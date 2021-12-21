import React,{useState,useEffect} from 'react';
import {  StyleSheet,View,Text} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {
//   Box,
//   Heading,
//   VStack,
//   FormControl,
//   Input,
//   Button,
//   Center,
//   Spinner,
//   Icon,
//   NativeBaseProvider,
// } from "native-base"
// import { MaterialIcons } from "@expo/vector-icons"
import { useDispatch} from 'react-redux'
import {registerUser} from '../../config/firebase'
import {updateUser} from "../../store/actions/userAction"

export default function SignUp({navigation}) {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [contact,setContact] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()

  const signUp = async () =>{

    try{
  
      const userObj =await registerUser({name,email,contact,password});
      console.log(userObj);
      dispatch(updateUser(userObj));
    }
    catch(e)
   {  if (e.code === 'auth/email-already-in-use') {
         alert('That email address is already in use!');
       }
   
       else if (e.code === 'auth/invalid-email') {
         alert('That email address is invalid!');
       }
        console.log(e)
    }

  
  }

  return (
      <View style={styles.container}>
            <Text style={styles.head}>Create Account</Text>
            <Text style={{ color: 'grey',fontWeight: 'bold', fontSize: 16,  marginBottom: 20}}>
            Create a new account</Text>
            <TextInput label="name" 
              value={name} onChangeText={(text) => setName(text)}
              style={{width:'95%',marginTop:8,}} 
             />
            <TextInput
              label="Email"
              value={email} onChangeText={(text) => setEmail(text)}
              style={{width:'95%',marginTop:8}}
             /> 
            <TextInput
              label="contact"
              value={contact} onChangeText={(text) => setContact(text)}
              style={{width:'95%',marginTop:8}}
             />
             <TextInput
              label="Password"
              secureTextEntry={true}
              value={password}  onChangeText={(text) => setPassword(text)} 
              style={{width:'95%',marginTop:8,marginBottom:25}}
             />
             
           <View style={{width:'86%'}}>
           <Button mode="contained" onPress={signUp}
            >Create Account</Button></View>
            <Text style={styles.bottomText}>Already have a account?
            <TouchableOpacity onPress = {() => navigation.navigate('Login')} >
        <Text style={styles.createAccountLink}>
                Login
            </Text>
            </TouchableOpacity>
            </Text>

             

      </View>



    // <NativeBaseProvider>
    // <Center flex={1} px="3">
    // <Box safeArea p="2" w="90%" maxW="290" py="8">
    //   <Heading
    //     size="lg"
    //     color="coolGray.800"
    //     _dark={{
    //       color: "warmGray.50",
    //     }}
    //     fontWeight="semibold"
    //   >
    //     Welcome
    //   </Heading>
    //   <Heading
    //     mt="1"
    //     color="coolGray.600"
    //     _dark={{
    //       color: "warmGray.200",
    //     }}
    //     fontWeight="medium"
    //     size="xs"
    //   >
    //     Sign up to continue!
    //   </Heading>
    //   <VStack space={3} mt="5">
    //     <FormControl>
    //       <FormControl.Label>Name</FormControl.Label>
    //       <Input value={name} onChangeText={(text) => setName(text)}/>
    //     </FormControl>
    //     <FormControl>
    //       <FormControl.Label>Contact No</FormControl.Label>
    //       <Input keyboardType="numeric" maxLength={11} value={contact} onChangeText={(text) => setContact(text)}/>
    //     </FormControl>
    //     <FormControl>
    //       <FormControl.Label>Email</FormControl.Label>
    //       <Input keyboardType="email-address" value={email} onChangeText={(text) => setEmail(text)}/>
    //     </FormControl>
    //     <FormControl>
    //       <FormControl.Label>Password</FormControl.Label>
    //       <Input  type={hidePass ? 'password' : 'text'} value={password}
    //       onChangeText={(text) => setPassword(text)} 
    //     InputRightElement={
    //       <Icon
    //         as={<MaterialIcons name={hidePass ? "visibility-off" : "visibility" }  color="black"
    //         onPress={() => setHidePass(!hidePass)}/>}
    //         size={5}
    //         mr="2"
    //         color="black"
    //       />
    //     }
       
    //   />
    
    //     </FormControl>
    //     {loading? <Spinner color="muted.900" size="lg"/>:
    //     <Button mt="2" bg="black" onPress={signUp}>
    //       Sign up
    //     </Button>}
    //   </VStack>
    // </Box>
    // </Center>
    // </NativeBaseProvider>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: {
        fontSize: 33,
        fontWeight: 'bold',
    },

    createAccountLink: {
        color: 'green',
    },
    bottomText: {
        marginTop: 18
    }
});