import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        width: 400,
        height: 400,
        marginBottom: 10,
        marginTop: 10,
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
    addButtons: {
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
});

export default styles;