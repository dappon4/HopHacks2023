import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '@rneui/themed';
import styles from './styles';
import logo from './components/Images/logo.png';
import axios from 'axios';

function HomeScreen({ navigation, route }) {
    const [textData, setTextData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [nurseId, setNurseId] = useState(null);
    const [rectangleCount, setRectangleCount] = useState(3); // 長方形の数を設定
    const [drugData, setDrugData] = useState(null);

    useEffect(() => {
        if (route.params?.userInfo) {
            console.log("dapple")
            setUserId(route.params.userInfo[0])
            setNurseId(route.params.userInfo[1])
        }
    }, [route.params])

    // 長方形のテキストデータを生成
    useEffect(() => {
        const data = [];
        for (let i = 0; i < rectangleCount; i++) {
            data.push(`Rectangle ${i + 1}`);
        }
        setTextData(data);
    }, [rectangleCount]);

    useEffect(() => {
        getDrugInfo();
    }, [])

    const getDrugInfo = async () => {
        try {
            const response = await axios.get(`http://159.223.136.17:5000/get?user=${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const responseData = response.data;
                console.log('server response:', responseData);
                setDrugData(responseData); // データを状態に設定
            } else {
                console.error('server error:', response.status, response.statusText);
                setError('Something went wrong, try again.');
            }
        } catch (error) {
            console.error('network error:', error);
            setError('Network error, try again.');
        }
    }

    console.log(drugData);

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
                {textData.map((text, index) => (
                    <View key={index} style={styles.rectangle}>
                        <View style={styles.shadowBox}>
                            <Text style={styles.rectangleText}>{text}</Text>
                        </View>
                    </View>
                ))}

                <Button
                    title="Change Rectangle Count"
                    onPress={() => setRectangleCount(rectangleCount + 1)}
                />
            </ScrollView>
        </View>
    );
}

export default HomeScreen;
