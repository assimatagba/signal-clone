import React, { useState, useLayoutEffect }  from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Image, Input, Text } from "react-native-elements"
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';


const RegisterScreen = ({ navigation }) => {

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ imageUrl, setImgUrl ] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [navigation])

    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: 
                        imageUrl || 
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                });
            })
            .catch((error) => alert(error.message)) 
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            {/* <Text h3 style={styles.text}>
                Create a Signal account
            </Text> */}

            <View style={styles.inputContainer}>
                <Text h3 style={styles.text}>
                    Create a Signal account
                </Text>
                <Input 
                    placeholder="Full Name"
                    type='text'
                    autoFocus
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder="Email"
                    type="email"
                    autoFocus
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder="Profile Picture url (optional)"
                    type='text'
                    value={imageUrl}
                    onChangeText={(text) => setImgUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            <Button 
                onPress={register}
                title="Register"
                raised
                style={styles.button}
            />
            <View style={{ height: 100 }}/>

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white"
    },

    text: {
        marginBottom: 50,
        marginLeft: 25
    },

    inputContainer: {
        width: 300
    },
    
    button: {
        width: 200,
        // marginTop: 10
    }
})