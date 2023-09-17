import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '@rneui/themed';
import styles from './styles';
import logo from './components/Images/logo.png'

function HomeScreen({ navigation, route }) {
    const [textData, setTextData] = useState([]);
    const [userInfo, setUserInfo] = useState(null)
    const [rectangleCount, setRectangleCount] = useState(3); // 長方形の数を設定

    useEffect(() => {
        if (route.params?.userInfo) {
            setUserInfo(route.params.userInfo);
            console.log(userInfo);
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
