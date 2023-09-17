import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { selectImage } from './SelectImage';

function CompatibilityScreen({ navigation, route }) {
    const [responseData, setResponseData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState("");
    const [power, setPower] = useState("");
    const [days, setDays] = useState("");
    const [time, setTime] = useState("");
    const [expiry, setExpiry] = useState("");

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
                setResponseData(responseData);
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
            }
        } catch (error) {
            console.error('network error3:', error);
            setError('Network error, try again.');
        }
    }

    const add = async () => {
        try {
            const response = await fetch(`http://159.223.136.17:5000/add?drug=${route.params.rx[2]}&userid=${route.params.rx[1]}&rxcuid=${route.params.rx[0]}&description=${description}&power=${power}&days=${days}&time=${time}&expiry=${expiry}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                navigation.navigate('Home', { userInfo: [route.params.rx[1]] })
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
                navigation.navigate('Home', { userInfo: [route.params.rx[1]] })
            }
        } catch (error) {
            console.error('network error4:', error);
            setError('Network error, try again.');
            navigation.navigate('Home', { userInfo: [route.params.rx[1]] })
        }
    }

    useEffect(() => {
        getCompatibility();
    }, []);

    const handleYesClick = () => {
        setShowForm(true);
    }

    const handleNoClick = () => {
        navigation.navigate('Home', { userInfo: [route.params.rx[1]] })
    }

    return (
        <View style={styles.container}>
            {responseData && responseData.map((data, index) => (
                <View key={index}>
                    <Text style={styles.compatibilityText}>{data.Interaction}</Text>
                    <Text style={styles.compatibilityText}>{data.Risk}</Text>
                </View>
            ))}
            <View style={{ flexDirection: 'row' }}>
                <Button title="No" style={{ size: "medium" }} onPress={handleNoClick} />
                <Button title="Yes" style={styles.compatibilityButton} onPress={handleYesClick} />
            </View>


            {showForm && (
                <View style={{ marginTop: 30, width: '60%', overflow: 'hidden' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text>Description: </Text>
                        <TextInput
                            style={styles.compatibilityTextBox}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Power: </Text>
                        <TextInput
                            style={styles.compatibilityTextBox}
                            value={power}
                            onChangeText={setPower}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Days: </Text>
                        <TextInput
                            style={styles.compatibilityTextBox}
                            value={days}
                            onChangeText={setDays}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Time: </Text>
                        <TextInput
                            style={styles.compatibilityTextBox}
                            value={time}
                            onChangeText={setTime}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Expiry: </Text>
                        <TextInput
                            style={styles.compatibilityTextBox}
                            value={expiry}
                            onChangeText={setExpiry}
                        />
                    </View>
                    <Button title="Submit" style={{ marginTop: 40 }} onPress={() => {
                        add();
                    }} />
                </View>
            )}
        </View>
    );
}

export default CompatibilityScreen;
