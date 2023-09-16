import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { Icon, } from 'react-native-elements';
import styles from './styles';

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
        <View>
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                ref={cameraRef}
            />
            <View style={styles.shutterButtonContainer}>
                <Icon
                    name="camera"
                    type="font-awesome"
                    color="black"
                    size={50}
                    onPress={takePicture}
                />
            </View>
            <StatusBar style="auto" />
        </View>
    )
}


export default CameraScreen;