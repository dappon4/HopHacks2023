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
        marginTop: '20%',
    },
    cameraContainer: {
        marginTop: '10%',
        alignSelf: 'center',
        width: 400,
        height: 400,
        borderRadius: 30,
        overflow: 'hidden'
    },

    camera: {
        width: 400,
        height: 400,
        marginBottom: 10,
        marginTop: 50,
        alignSelf: 'center',

    },
    image: {
        width: 400,
        height: 400,
        marginBottom: 10,
        marginTop: 10,
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
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
        color: 'black', // テキストの色
        fontSize: 16, // テキストのフォントサイズ
        alignSelf: 'center'
    },
    shadowBox: {
        width: '100%',
        height: 110,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,
    },

});

export default styles;