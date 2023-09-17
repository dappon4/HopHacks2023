import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { selectImage } from './SelectImage';

import camLogo from './components/Images/camLogo.png'
import uploadimg from './components/Images/uploadimg.png'
import greendots from './components/Images/greendots.png'
import orBlack from './components/Images/orBlack.png'
import x from './components/Images/x.png'

function AddScreen({ navigation, route }) {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const id = route.params.userInfo2[0]

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
                if(responseData.result !== "false") {
                    navigation.navigate('Compatibility', { rx: [responseData.rxuid, id] })
                } else {
                    navigation.navigate('Home', { userInfo: [id] })
                }
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
            }
        } catch (error) {
            console.error('network error1:', error);
            setError('Network error, try again.');
        }
    };

    const sendTextToServer = async () => {
        const drugName = inputValue;
        setError(null);

        try {
            const response = await fetch(`http://159.223.136.17:5000/manual_check?drug=${drugName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                if(responseData.result != "false") {
                    navigation.navigate('Compatibility', { rx: [responseData.rxuid, id]})
                } else {
                    navigation.navigate('Home', { userInfo : [id] })
                }
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
            }
        } catch (error) {
            console.error('network error2:', error);
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
            setSelectedPhoto(result);
        }
    };

    return (
        <View>
            {!selectedPhoto && (
                <View style={styles.photoHolder}>
                    <Image source={greendots} style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -1 }} resizeMode='contain' />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Camera', {userInfoCamera : [id]})}><Image source={camLogo} style={{ width: 90, height: 90, margin: 25 }} resizeMode="contain" /></TouchableOpacity>
                        <TouchableOpacity onPress={pickImageFromGallery} ><Image source={uploadimg} style={{ width: 90, height: 90, margin: 25 }} resizeMode="contain" /></TouchableOpacity>
                    </View>
                </View>
            )}
            {
                selectedPhoto && (
                    <View>
                        <TouchableOpacity onPress={() => setSelectedPhoto(null)}><Image source={x} style={{ width: 60, height: 60, position: 'absolute', right: 30, top: 70, }} resizeMode='contain' /></TouchableOpacity>
                        <Image source={{ uri: selectedPhoto.uri }} style={styles.image} />
                        <Button title="send to server" onPress={sendImageToServer} />

                    </View>
                )
            }

            {
                error && (
                    <Text style={styles.errorText}>{error}</Text>
                )
            }
            <Image source={orBlack} style={{ width: 100, height: 100, alignSelf: 'center' }} resizeMode='contain' />
            <View>
                <TextInput style={styles.textContainer}
                    placeholder="Enter drug name"
                    onChangeText={handleInputChange} // 入力値の変更を検知して関数を呼び出す
                    value={inputValue} // 入力値を状態に紐付ける
                />
                <Button title="OK" style={{ width: '30%' }} onPress={sendTextToServer} />

            </View>


            <StatusBar style="auto" />
        </View >
    );
}


export default AddScreen;