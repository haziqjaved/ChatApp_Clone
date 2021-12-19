import { onSnapshot } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'

import { getFirestore, collection, query} from "firebase/firestore";
export default function users() {
    const db = getFirestore();
    const [allUser, setAllUser] = useState([])

    useEffect(()=>{
        let dataArray = []
        const q = query(collection(db, "user"));
            onSnapshot(q,(snap)=>{
                snap.forEach((doc) => {
                    dataArray.push({...doc.data(),id:doc.id})
                    
                });
                setAllUser(dataArray)
            })
    },[])

    return (<View style={{backgroundColor:'blue',height:'100%',marginTop:30}}>
        <Text >
            Users
        </Text>
        {allUser.map((item) => (
            <Text >{item.userName}</Text>
        ))}
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});