import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity  } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { StatusBar } from 'expo-status-bar';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { auth } from '../firebase';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }
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
            )
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="black" />

            <ScrollView>
                <CustomListItem />
                

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 0
    }
})
