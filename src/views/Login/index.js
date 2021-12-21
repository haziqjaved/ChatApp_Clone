import  React,{useState} from "react"
import {View,StyleSheet,Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput,Button } from 'react-native-paper';

import { useDispatch} from 'react-redux'
import { loginUser } from "../../config/firebase"
import {updateUser} from "../../store/actions/userAction"

export default function Login({ navigation })
 {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

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
