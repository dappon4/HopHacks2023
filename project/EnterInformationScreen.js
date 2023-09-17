import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import MediMinglelogo from './components/Images/MediMinglelogo.png';
import login from './components/Images/login.png'



function EnterInformationScreen({ navigation, route }) {
    const [mode, setMode] = useState(null);
    const [error, setError] = useState(null);
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const handleUserNameChange = (text) => {
        setInputUserName(text);
    }

    const handlePasswordChange = (text) => {
        setInputPassword(text);
    }

    const sendUserInfoLogIn = async () => {
        try {
            console.log("apple")
            console.log(inputUserName)
            console.log(inputPassword)
            const response = await fetch(`http://159.223.136.17:5000/login?name=${inputUserName}&password=${inputPassword}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.ok) {
                const responseData = await response.text();
                console.log('server response:', responseData);


                navigation.navigate('Home', { userInfo: responseData })
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
            }
        } catch (error) {
            console.error('network error:', error);
            setError('Network error, try again.');
        }

    }

    if (route.params.mode == "login") {

        return (
            <View style={{ marginTop: 100 }}>
                <TextInput style={styles.textContainer}
                    placeholder="Enter username"
                    onChangeText={handleUserNameChange}

                />
                <TextInput style={styles.textContainer}
                    placeholder="Enter password"
                    onChangeText={handlePasswordChange}

                />
                <TouchableOpacity onPress={sendUserInfoLogIn}>
                    <Image source={login} style={{ width: 100, height: 200 }} resizeMode='contain' />
                </TouchableOpacity>
            </View>

        );
    } else if (route.params.mode == "signup") {
        return (
            <View>

            </View>
        );
    } else {
        return (
            <View>
                <Text>Something went wrong</Text>
                <Button title="Return to previous page" />
            </View>
        )
    }
}

export default EnterInformationScreen;