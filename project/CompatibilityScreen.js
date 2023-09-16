import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, } from 'react-native';
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
        <View>
            <Text>Detected drug: {drugName}</Text>
            <Button>Redo</Button>

        </View>
    );
}

export default CompatibilityScreen;