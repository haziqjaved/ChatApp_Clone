import  React,{useState} from "react"
import {View,StyleSheet,Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput,Button } from 'react-native-paper';
// import {
//   Box,
//   Heading,
//   VStack,
//   FormControl,
//   Input,
//   Link,
//   Button,
//   HStack,
//   Center,
//   NativeBaseProvider,
//   Spinner,
//   Icon
// } from "native-base"
import { useDispatch} from 'react-redux'
import { MaterialIcons } from "@expo/vector-icons"
import { loginUser } from "../../config/firebase"
import {updateUser} from "../../store/actions/userAction"

export default function Login({ navigation })
 {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [hidePass, setHidePass] = useState(true)
  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch()

  const forget=()=>{
    alert('Contact Admin')
}
  const logIN = async () =>{
    try {
      const userObj = await loginUser(email,password)
      console.log(userObj);
     dispatch(updateUser(userObj))
    } catch (e) {
      alert(e.message)
    }
  }
  return (

    <View style={styles.container}>
        <Text style={styles.head}>Welcome Back</Text>
        <Text style={styles.signin}>Signin to continue</Text> 
        <TextInput
              placeholder='Email'        
              value={email}
              onChangeText={(text) => setEmail(text)}  
              style={{width:'90%'}}
         />
        <TextInput
              placeholder='Password'         
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)} 
              style={{width:'90%',marginTop:10}}
         />      
        <Text style={styles.forget}  onPress={forget}>Forget Password?</Text>
           <View style={{width:'86%'}}>
           <Button mode="contained"  onPress={logIN}>LogIn</Button>
           </View>
           <Text style={styles.bottomText}>Don't have account?
                <TouchableOpacity 
                  onPress={()=>navigation.navigate('SignUp')} >
                    <Text style={styles.createAccountLink}> Create a new Account
                    </Text>
                </TouchableOpacity>
            </Text>


    </View>
    // <NativeBaseProvider>
    // <Center flex={1} px="3">
    // <Box safeArea p="2" py="8" w="90%" maxW="290">
    //   <Heading
    //     size="lg"
    //     fontWeight="600"
    //     color="coolGray.800"
    //     _dark={{
    //       color: "warmGray.50",
    //     }}
    //   >
    //     Welcome
    //   </Heading>
    //   <Heading
    //     mt="1"
    //     _dark={{
    //       color: "warmGray.200",
    //     }}
    //     color="coolGray.600"
    //     fontWeight="medium"
    //     size="xs"
    //   >
    //     Sign in to continue!
    //   </Heading>

    //   <VStack space={3} mt="5">
    //     <FormControl>
    //       <FormControl.Label>Email ID</FormControl.Label>
    //       <Input keyboardType="email-address" value={email} onChangeText={(text) => setEmail(text)} isRequired={true}/>
    //     </FormControl>
    //     <FormControl>
    //       <FormControl.Label>Password</FormControl.Label>
    //       <Input  type={hidePass ? 'password' : 'text'} value={password}
    //       onChangeText={(text) => setPassword(text)} 
    //        InputRightElement={
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
      
    //       {loading? <Spinner color="muted.900" size="lg"/>:<Button mt="2" bg="black" onPress={login}>
    //       Sign in
    //     </Button>
    //       }
       
    //     <HStack mt="6" justifyContent="center">
    //       <Text
    //         fontSize="sm"
    //         color="coolGray.600"
    //         _dark={{
    //           color: "warmGray.200",
    //         }}
    //       >
    //         I'm a new user.{" "}
    //       </Text>
    //       <Link
    //         _text={{
    //           color: "indigo.500",
    //           fontWeight: "medium",
    //           fontSize: "sm",
    //         }}
    //         href="#"
    //         onPress={() =>navigation.navigate('SignUp')}
    //       >
    //         Sign Up
    //       </Link>
    //     </HStack>
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
  }, Avatar: {
      width: 160,
      height: 160,
      backgroundColor:'transparent'
  },
  head: {
      fontSize: 32,
      fontWeight: 'bold',
  },
  signin: {
      color: 'gray',
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 20
  },
  forget: {
      color: 'green',
      marginLeft: 150,
      marginTop:8,
      marginBottom: 10,
  },
  createAccountLink: {
      color: 'green',
      fontSize: 15,
  },
  bottomText: {
      marginTop: 18
  }
});
