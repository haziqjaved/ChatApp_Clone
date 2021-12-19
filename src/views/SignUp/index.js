import React,{useState,useEffect} from 'react';
import {  StyleSheet,View,Text} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { registerUser } from '../../config/firebase';

export default SignUp=({navigation})=>{
    const [authData, setAuthData] = useState({})
  const [password, setPassword] = useState('')
  const onChangeValues = (key, text) => {
    console.log(text)
    const value = key === "images" ? text : text
    setAuthData({ ...authData, [key]: value })
    console.log("On Change: ", authData)
  }
  const submit = async () => {
    try {
      await registerUser(authData, password)
    }
    catch (e) {
      alert(e.message)
    }
  }
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Create Account</Text>
            <Text style={{ color: 'grey',fontWeight: 'bold', fontSize: 16,  marginBottom: 20}}>
            Create a new account</Text>
            <TextInput
            label="UserName"
            onChangeText={(text) => onChangeValues('userName', text)}
                style={{width:'95%',marginTop:8,}} 
            />        
            <TextInput
            label="Email"
            onChangeText={(text) => onChangeValues('email', text)}
                style={{width:'95%',marginTop:8}}
            />
            <TextInput
                label='Password' 
                onChangeText={(text) => setPassword(text)} secureTextEntry={true} 
                style={{width:'95%',marginBottom:10,marginTop:8}}
            />
           <View style={{width:'86%'}}><Button mode="contained" onPress={submit}
            >Create Account</Button></View>
            <Text style={styles.bottomText}>Already have a account?
            <TouchableOpacity onPress = {() => navigation.navigate('Login')} >
        <Text style={styles.createAccountLink}>
                Login
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