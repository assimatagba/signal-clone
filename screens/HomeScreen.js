import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity  } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { StatusBar } from 'expo-status-bar';
import { ListItem, Avatar } from "react-native-elements"
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
// import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {

    const [ chats, setChats ] = useState([])
    // console.log(chats['id']);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) => 
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
        
        return unsubscribe
    }, [chats])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff"},
            headerTitleStyle: { color: "black"},
            headerTintColor: "black",
            headerLeft: () => ( 
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} >
                        <Avatar 
                        rounded
                        source={{uri: auth?.currentUser?.photoURL ? auth?.currentUser?.photoURL : "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}} 
                        />
                    </TouchableOpacity>
                    
                </View>
            ),
            headerRight: () => (
                <View style={{ 
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="black" />
            <ScrollView>
                {chats.map(({id, data: { chatName }}) => {
                    <CustomListItem key={id} id={id} chatName={chatName} />
                })}
            </ScrollView>
            <CustomListItem />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 0
    }
})
