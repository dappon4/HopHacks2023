import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '@rneui/themed';
import styles from './styles';
import logo from './components/Images/logo.png';
import axios from 'axios';

function HomeScreen({ navigation, route }) {
    const [drugData, setDrugData] = useState(null);

    useEffect(() => {
        getDrugInfo();
    }, [])

    const getDrugInfo = async () => {
        try {
            const response = await axios.get(`http://159.223.136.17:5000/get?user=${route.params.userInfo[0]}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data !== "No prescriptions found") {
                setDrugData(response.data);
            } else {
                setDrugData(null);
            }
        } catch (error) {
            console.error('network error:', error);
            setError('Network error, try again.');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.addButtonContainer}>
                <Image source={logo} style={{ height: 100, marginTop: 50 }} resizeMode='contain' />
                <Button radius={15} icon={
                    <Icon
                        name="add"
                        type="material"
                        size={30}
                        color="white"
                    />
                } onPress={() => navigation.navigate('Add')} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {drugData && drugData.map((item, index) => (
                    <View key={index} style={styles.rectangle}>
                        <View style={styles.shadowBox}>
                            <Text style={styles.rectangleText}>Drug: {item.drug}</Text>
                            <Text style={styles.rectangleText}>Description: {item.description}</Text>
                            <Text style={styles.rectangleText}>Power: {item.power}</Text>
                            {/* Add more fields as needed */}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default HomeScreen;

