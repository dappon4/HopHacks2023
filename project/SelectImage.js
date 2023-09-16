import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';




export function selectImage({ navigation }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setSelectedImage(result.assets[0].uri);
            navigation.navigate('Add', { selectedPhoto: selectedImage });

        } else {
            alert('You did not select any image.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer

                    selectedImage={selectedImage}
                />
            </View>
            <View style={styles.footerContainer}>
                <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
                <Button label="Use this photo" />
            </View>
            <Text style={{ color: '#fff' }}>Medi Mingle</Text>
            <StatusBar style="auto" />
        </View> //you need to initialize view and then close it


    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    yellowBox: {
        flex: 2,
        backgroundColor: '#1234',
        alignItems: 'center',
        justifyContent: 'center',

    },
});