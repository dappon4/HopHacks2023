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
    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputHeight, setInputHeight] = useState('');
    const [inputWeight, setInputWeight] = useState('');
    const [inputDateOfBirth, setInputDateOfBirth] = useState('');
    const [inputNurseId, setInputNurseId] = useState('');
    const [inputDoctorId, setInputDoctorId] = useState('');


    const handleUserNameChange = (text) => {
        setInputUserName(text);
    }

    const handlePasswordChange = (text) => {
        setInputPassword(text);
    }
    const handleFirstNameChange = (text) => {
        setInputFirstName(text);
    }

    const handleLastNameChange = (text) => {
        setInputLastName(text);
    }
    const handleHeightChange = (text) => {
        setInputHeight(text);
    }

    const handleWeightChange = (text) => {
        setInputWeight(text);
    }
    const handleDateOfBirthChange = (text) => {
        setInputDateOfBirth(text);
    }

    const handleNurseIdChange = (text) => {
        setInputNurseId(text);
    }
    const handleDoctorIdChange = (text) => {
        setInputDoctorId(text);
    }


    const sendUserInfoLogIn = async () => {
        try {
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
                userId = responseData.split("-")[0]
                nurseId = responseData.split("-")[1]
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

    const sendUserInfoSignUp = async () => {
        try {
            console.log(inputUserName)
            console.log(inputPassword)
            const response = await fetch(`http://159.223.136.17:5000/register?name=${inputUserName}&password=${inputPassword}&first_name=${inputFirstName}&last_name=${inputLastName}&height=${inputHeight}&weight=${inputWeight}&date_of_birth=${inputDateOfBirth}&nurse_id=${inputNurseId}&doctor_id=${inputDoctorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.ok) {
                const responseData = await response.text();
                console.log('server response:', responseData);
                navigation.navigate('Info', { mode: "login" })
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
            <View style={{ marginTop: 100 }}>
                <TextInput style={styles.textContainer}
                    placeholder="Enter username"
                    onChangeText={handleUserNameChange}

                />
                <TextInput style={styles.textContainer}
                    placeholder="Enter password"
                    onChangeText={handlePasswordChange}

                />
                <TextInput style={styles.textContainer}
                    placeholder="Enter first name"
                    onChangeText={handleFirstNameChange}

                />
                <TextInput style={styles.textContainer}
                    placeholder="Enter last name"
                    onChangeText={handleLastNameChange}

                />
                <TextInput style={styles.textContainer}
                    placeholder="Enter height"
                    onChangeText={handleHeightChange}

                />
                <TextInput style={styles.textContainer}
                    placeholder="Enter weight"
                    onChangeText={handleWeightChange}

                />
                <TextInput style={styles.textContainer}
                    placeholder="Enter date of birth"
                    onChangeText={handleDateOfBirthChange}

                />
                <TextInput style={styles.textContainer}
                    placeholder="Enter nurse id"
                    onChangeText={handleNurseIdChange}

                />
                <TextInput style={styles.textContainer}
                    placeholder="Enter doctor id"
                    onChangeText={handleDoctorIdChange}

                />
                <TouchableOpacity onPress={sendUserInfoSignUp}>
                    <Image source={login} style={{ width: 100, height: 200 }} resizeMode='contain' />
                </TouchableOpacity>
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