import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'

const HomeScreen = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal"
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: -50
    }
})
