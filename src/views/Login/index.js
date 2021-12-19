import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { loginWithUser } from '../../config/firebase.js';
import React,{useState} from 'react';


export default Login=({navigation})=> {
    const [authData,setAuthData]=useState({})

    const forget=()=>{
        alert('Contact Admin')
    }
    const onChangeValues = (key, text) => {
        console.log(text)
        setAuthData({ ...authData, [key]: text })
        console.log("On Change: ", authData)
      }
      const signIN=async()=>{
        try{
            await loginWithUser(authData)
            alert("Login SuccessFully")
        
        }catch(e){
            alert(e.message)
            navigation.navigate('Login')
        }}
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Welcome Back</Text>
            <Text style={styles.signin}>Signin to continue</Text>
            <TextInput
                onChangeText={(text) => onChangeValues('email', text)} type="email"
                placeholder='Email'         
                style={{width:'90%'}}
            />
            <TextInput
              onChangeText={(text) => onChangeValues('password', text)} secureTextEntry={true}
              placeholder='Password' 
              style={{width:'90%',marginTop:10}}
            />
            <Text style={styles.forget}  onPress={forget}>Forget Password?</Text>
           <View style={{width:'86%'}}><Button mode="contained"  
           onPress={signIN} 
           >LogIn</Button></View>
            <Text style={styles.bottomText}>Don't have account?
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                    <Text style={styles.createAccountLink}> Create a new Account
                    </Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
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