import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text } from 'react-native';
import { Button } from '@rneui/themed';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { selectImage } from './SelectImage';

function CompatibilityScreen({ navigation, route }) {

    console.log(route.params.rx[1])
    console.log(route.params.rx[0])
    
    const getCompatibility = async () => {
        try {
            const response = await fetch(`http://159.223.136.17:5000/check_compatibility?drug=${route.params.rx[0]}&userid=${route.params.rx[1]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
+               console.log(responseData);
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
            }
        } catch (error) {
            console.error('network error3:', error);
            setError('Network error, try again.');
        }
    }

    useEffect(() => {
        getCompatibility();
    });
}

export default CompatibilityScreen;
