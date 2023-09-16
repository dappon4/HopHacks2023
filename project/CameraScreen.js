import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Camera } from 'expo-camera';
import { ThemeProvider } from 'react-native-elements';
import styles from './styles';

// Define a custom theme for the Icon component
const customTheme = {
    Icon: {
        iconStyle: {
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 30,
            padding: 5,
        },
    },
};

function CameraScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        // request camera permission
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            navigation.navigate('Add', { selectedPhoto: photo });
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Camera not permitted</Text>;
    }

    return (
        <ThemeProvider theme={customTheme}>
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                    ref={cameraRef}
                />
            </View>
            <View>
                <View style={styles.shutterButtonContainer}>
                    <TouchableWithoutFeedback onPress={takePicture}>
                        <Image
                            source={require('./components/Images/camLogo.png')} // Adjust the path accordingly
                            style={{ width: 60, height: 60 }} // Define the size of your image
                        />
                    </TouchableWithoutFeedback>
                </View>
                <StatusBar style="auto" />
            </View>
        </ThemeProvider >
    );
}

export default CameraScreen;