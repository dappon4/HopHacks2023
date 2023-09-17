import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import MediMinglelogo from './components/Images/MediMinglelogo.png';
import MingleImage from './components/Images/mingle.png';
import login from './components/Images/login.png';
import HaveAccountImage from './components/Images/haveAccount.png'; // Import the haveAccount.png image
import signUp from './components/Images/signUp.png';


function LoginScreen() {
    const navigation = useNavigation();


    const handleLogin = () => {
        navigation.navigate('Info', { mode: "login" });
    };

    const handleSignUp = () => {
        navigation.navigate("Info", { mode: "signup" })
    }

    return (
        <View style={{ alignItems: 'center' }}>
            {/* Logo */}
            <Image
                source={MediMinglelogo}
                style={{
                    width: 200,
                    height: 200,
                    marginTop: 100,
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

                }}
                resizeMode="contain"
            />
            <View>
                {/* Login Button Image with TouchableOpacity */}
                <TouchableOpacity onPress={handleLogin}>
                    <Image
                        source={login}
                        style={{
                            width: 150,
                            height: 150,

                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                {/* Have Account Image */}
                <TouchableOpacity onPress={handleSignUp}>
                    <Image
                        source={signUp}
                        style={{
                            width: 150,
                            height: 150,
                            marginTop: -60

                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LoginScreen;