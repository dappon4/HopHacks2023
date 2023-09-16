import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text } from 'react-native';
import { Button } from '@rneui/themed';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { selectImage } from './SelectImage';

function AddScreen({ navigation, route }) {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (route.params?.selectedPhoto) {
            setSelectedPhoto(route.params.selectedPhoto);
        }
    }, [route.params]);

    const sendImageToServer = async () => {
        const imgData = new FormData();
        imgData.append('Medicineimage', {
            uri: selectedPhoto.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });

        try {
            const response = await fetch('http://159.223.136.17:5000/scan_check', {
                method: 'POST',
                body: imgData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('server response:', responseData);

                navigation.navigate('Compatibility', { drugName: responseData })
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
            }
        } catch (error) {
            console.error('network error:', error);
            setError('Network error, try again.');
        }
    };

    const pickImageFromGallery = async () => {
        // ギャラリーから画像を選択する
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            // 選択した画像をセット
            setSelectedPhoto(result);
        }
    };

    return (
        <View>
            {selectedPhoto && (
                <Image source={{ uri: selectedPhoto.uri }} style={styles.image} />
            )}
            {selectedPhoto && (
                <Button title="send to server" onPress={sendImageToServer} />
            )}
            {!selectedPhoto && (
                <View style={styles.photoHolder}></View>
            )}
            <View style={styles.buttonContainer}>
                <Button title="Activate Camera" buttonStyle={styles.addPicture} type='outline' radius={15} onPress={() => navigation.navigate('Camera')} />
                <Button title="Pick from Gallery" buttonStyle={styles.addPicture} type='outline' radius={15} onPress={pickImageFromGallery} />
            </View>

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}


            <StatusBar style="auto" />
        </View>
    );
}


export default AddScreen;