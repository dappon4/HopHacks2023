import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';

function HomeScreen({ navigation }) {
    const [textData, setTextData] = useState([]);


    return (
        <View style={styles.container}>
            <Button title="Go to add" onPress={() => navigation.navigate('Add')} />
        </View>
    );
}


export default HomeScreen;