import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { selectImage } from './SelectImage';

import camLogo from './components/Images/camLogo.png'
import uploadimg from './components/Images/uploadimg.png'

function AddScreen({ navigation, route }) {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');

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
        setError(null);

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

    const sendTextToServer = async () => {
        const drugName = inputValue;
        setError(null);

        try {
            const response = await fetch(`http://159.223.136.17:5000/manual_check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // リクエストのヘッダーでJSONを指定
                },
                body: JSON.stringify({ drugName }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('server response:', responseData);
                navigation.navigate('Compatibility', { drugName: responseData });
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
            }
        } catch (error) {
            console.error('network error:', error);
            setError('Network error, try again.');
        }
    };

    const handleInputChange = (text) => {
        setInputValue(text);
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
            {!selectedPhoto && (
                <View style={styles.photoHolder}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Camera')}><Image source={camLogo} style={{ width: 100, height: 100, margin: 20 }} resizeMode="contain" /></TouchableOpacity>
                        <TouchableOpacity onPress={pickImageFromGallery} ><Image source={uploadimg} style={{ width: 100, height: 100, margin: 20 }} resizeMode="contain" /></TouchableOpacity>
                    </View>
                </View>
            )}
            {
                selectedPhoto && (
                    <Image source={{ uri: selectedPhoto.uri }} style={styles.image} />
                )
            }
            {
                selectedPhoto && (
                    <Button title="send to server" onPress={sendImageToServer} />
                )
            }


            {
                error && (
                    <Text style={styles.errorText}>{error}</Text>
                )
            }
            <Text style={{ alignSelf: 'center', fontSize: 30 }}>OR</Text>
            <View>
                <TextInput style={styles.textContainer}
                    placeholder="Enter drug name"
                    onChangeText={handleInputChange} // 入力値の変更を検知して関数を呼び出す
                    value={inputValue} // 入力値を状態に紐付ける
                />
                <Button title="send" onPress={sendTextToServer} />

            </View>


            <StatusBar style="auto" />
        </View >
    );
}


export default AddScreen;