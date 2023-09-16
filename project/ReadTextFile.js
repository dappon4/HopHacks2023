import { FileSystem } from 'react-native-unimodules'; // ファイルシステムモジュールをインポート

export async function readTextFile(filePath) {
    try {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const textArray = fileContent.split('\n');
        return textArray;
    } catch (error) {
        console.error('Error reading text file:', error);
        return [];
    }
}