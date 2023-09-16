import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';

function HomeScreen({ navigation }) {
    const [textData, setTextData] = useState([]);
    const [rectangleCount, setRectangleCount] = useState(5); // 長方形の数を設定

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
            {/* 長方形のテキストを表示 */}
            {textData.map((text, index) => (
                <View key={index} style={styles.rectangle}>
                    <Text style={styles.rectangleText}>{text}</Text>
                </View>
            ))}

            {/* 長方形の数を変更するボタン */}
            <Button
                title="Change Rectangle Count"
                onPress={() => setRectangleCount(rectangleCount + 1)}
            />

            <Button title="Go to add" onPress={() => navigation.navigate('Add')} />
        </View>
    );
}

export default HomeScreen;
