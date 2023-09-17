import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonContainer: {
        margin: 30,
        marginTop: 0,
    },
    cameraContainer: {
        marginTop: '10%',
        alignSelf: 'center',
        width: 400,
        height: 400,
        borderRadius: 30,
        overflow: 'hidden'
    },
    textContainer: {
        borderWidth: 1,
        borderColor: 'lightblue',
        width: '60%',
        alignSelf: 'center'

    },

    camera: {
        width: 300,
        height: 300,
        marginBottom: 10,
        marginTop: 50,
        alignSelf: 'center',

    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 10,
        marginTop: 100,
        alignSelf: 'center',
    },
    shutterButtonContainer: {
        alignSelf: 'center',
        bottom: '20%',
        zIndex: 1,
    },

    detectedContainer: {
        margin: 10,
        alignContent: 'center',
    },

    addPicture: {
        margin: 10,
        width: 150,
        height: 150
    },
    buttonContainer: {
        alignItems: 'center',
    },
    rectangle: {
        width: 300,
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginVertical: 20, // 上下の余白を設定
        marginHorizontal: 20,
    },
    rectangleText: {
        color: 'black',
        fontSize: 12,
    },
    shadowBox: {
        width: '110%',
        height: 100,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,
        padding: 7,
    },
    errorText: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 20,
    },
    photoHolder: {
        margin: 10,
        marginTop: 100,
        height: 300,
        width: 300,
        borderColor: 'lightblue',
        alignSelf: 'center'
    },

    textinputcurved: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 4,
        borderRadius: 6,
        width: '80%',
        alignSelf: 'center'
    },

});

export default styles;