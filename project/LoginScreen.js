import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import MediMinglelogo from './components/Images/MediMinglelogo.png';
import MingleImage from './components/Images/mingle.png';
import LoginBtnImage from './components/Images/loginBtn.png';
import HaveAccountImage from './components/Images/haveAccount.png'; // Import the haveAccount.png image

function LoginScreen() {
    const navigation = useNavigation();

    const handleLoginBtnPress = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={MediMinglelogo}
                style={{
                    width: 200,
                    height: 200,
                    marginTop: 200,
                    marginBottom: 20,
                }}
                resizeMode="contain"
            />

            {/* Mingle Image */}
            <Image
                source={MingleImage}
                style={{
                    width: 300,
                    height: 300,
                    marginTop: 0,
                    marginBottom: 30,
                }}
                resizeMode="contain"
            />

            {/* Login Button Image with TouchableOpacity */}
            <TouchableOpacity onPress={handleLoginBtnPress}>
                <Image
                    source={LoginBtnImage}
                    style={{
                        width: 250,
                        height: 250,
                        MarginTop: 100,

                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Have Account Image */}
            <Image
                source={HaveAccountImage}
                style={{
                    width: 200,
                    height: 100,

                }}
                resizeMode="contain"
            />
        </View>
    );
}

export default LoginScreen;