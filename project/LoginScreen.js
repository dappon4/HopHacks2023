import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import styles from './styles';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // ユーザー名とパスワードを使用してサーバーにログインリクエストを送信する処理をここに追加
        // この例ではfetchを使用しますが、実際のサーバーに合わせてカスタマイズしてください。
        fetch('https://your-server-url.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // ログイン成功時の処理をここに追加
                    console.log('ログイン成功');
                    navigation.navigate('Home'); // ログイン後の画面に遷移
                } else {
                    // ログイン失敗時の処理をここに追加
                    console.error('ログイン失敗');
                }
            })
            .catch((error) => {
                console.error('ネットワークエラー:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text>ユーザー名:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="ユーザー名を入力"
            />
            <Text>パスワード:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="パスワードを入力"
                secureTextEntry={true} // パスワードを隠す
            />
            <Button title="ログイン" onPress={handleLogin} buttonStyle={color = 'black'} />
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

export default LoginScreen;
