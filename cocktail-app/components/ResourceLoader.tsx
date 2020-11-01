import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View } from './Themed';
export default function ResourceLoader () {
    return (
        <View style={styles.main}>
            <ActivityIndicator size="large" /> 
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});