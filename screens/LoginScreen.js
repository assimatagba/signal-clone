import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native'
import { Button, Image, Input } from "react-native-elements"
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])
    const signIn = () => {

    }
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Image 
                source={{
                    uri: 
                        "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                }} 
                style={styles.image}
                />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChange={(text) => setPassword(text)}
                />
            </View>

            <Button 
                containerStyle={styles.button} 
                title="Login" 
                onPress={signIn}
                />
            <Button 
                containerStyle={styles.button} 
                type="outline" 
                title="Register" 
                onPress={() => navigation.navigate("Register")}
                />
            <View style={{ height: 100 }}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
    },

    image: {
        width: 200, 
        height: 200,
    },

    inputContainer: {
        width: 300
    },

    button: {
        width: 200,
        marginTop: 10
    }
})
