import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text } from 'react-native';
import { Button } from '@rneui/themed';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { selectImage } from './SelectImage';

function CompatibilityScreen({ navigation, route }) {
    const [drugName, setDrugName] = useState(null);

    useEffect(() => {
        if (route.params?.drugName) {
            setDrugName(route.params.drugName);
        }
    }, [route.params]);


    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>Detected drug: {drugName}</Text>
            <Button title="retry" onPress={() => navigation.navigate("Add")}></Button>
            <Text style={{ fontSize: 30 }}>Check Compatibility</Text>
        </View>
    );
}

export default CompatibilityScreen;