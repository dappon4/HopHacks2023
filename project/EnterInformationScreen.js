import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import MediMinglelogo from './components/Images/MediMinglelogo.png';
import MingleImage from './components/Images/mingle.png';
import login from './components/Images/login.png';
import HaveAccountImage from './components/Images/haveAccount.png'; // Import the haveAccount.png image
import signUp from './components/Images/signUp.png';


function EnterInformationScreen({ navigation, route }) {
    const [mode, setMode] = useState(null)

    if (route.params.mode == "login") {
        return (
            <View>

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