import React, { useEffect, useId, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Button, Text } from 'react-native';
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
            const response = await fetch(`http://159.223.136.17:5000/login?name=${inputUserName}&password=${inputPassword}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                if (responseData.result === "true") {
                    var userId = responseData.userid;
                    var nurseId = responseData.nurseid;
                    navigation.navigate('Home', { userInfo: [userId, nurseId] });
                } else if (responseData.result === "Incorrect password") {
                    setError('Incorrect password, try again.');
                } else if (responseData.result === "User does not exist") {
                    setError('User does not exist, try again.');
                }
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
            const response = await fetch(`http://159.223.136.17:5000/register?name=${inputUserName}&password=${inputPassword}&first_name=${inputFirstName}&last_name=${inputLastName}&height=${inputHeight}&weight=${inputWeight}&date_of_birth=${inputDateOfBirth}&nurse_id=${inputNurseId}&doctor_id=${inputDoctorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.ok) {
                const responseData = await response.text();
                navigation.navigate('Info', { mode: "login" })
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
            }
        } catch (error) {
            console.error('network error5:', error);
            setError('Network error, try again.');
        }

    }

    if (route.params.mode == "login") {

        return (
            <View style={{ marginTop: 100, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter username"
                    onChangeText={handleUserNameChange}

                />
                <TextInput secureTextEntry={true} style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter password"
                    onChangeText={handlePasswordChange}

                />
                <TouchableOpacity onPress={sendUserInfoLogIn}>
                    <Text style={{ backgroundColor: 'lightgreen', height: 60, width: 150, fontSize: 30, textAlign: 'center', textAlignVertical: 'center', borderRadius: 5, margin: 40 }}>Log In</Text>
                </TouchableOpacity>
            </View>

        );

    } else if (route.params.mode == "signup") {
        return (
            <View style={{ marginTop: 100, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter username"
                    onChangeText={handleUserNameChange}

                />
                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter password"
                    onChangeText={handlePasswordChange}

                />
                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter first name"
                    onChangeText={handleFirstNameChange}

                />
                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter last name"
                    onChangeText={handleLastNameChange}

                />
                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter height"
                    onChangeText={handleHeightChange}

                />
                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter weight"
                    onChangeText={handleWeightChange}

                />
                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter date of birth"
                    onChangeText={handleDateOfBirthChange}

                />
                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter nurse id"
                    onChangeText={handleNurseIdChange}

                />
                <TextInput style={[styles.textinputcurved, { marginTop: 2, marginBottom: 2, padding: 15 }]}
                    placeholder="Enter doctor id"
                    onChangeText={handleDoctorIdChange}

                />
                <TouchableOpacity onPress={sendUserInfoSignUp}>
                    <Text style={{ backgroundColor: 'lightgreen', height: 60, width: 150, fontSize: 30, textAlign: 'center', textAlignVertical: 'center', borderRadius: 5, margin: 40 }}>Sign Up</Text>
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