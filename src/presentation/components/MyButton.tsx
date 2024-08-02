import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, Alert } from 'react-native';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

interface MyButtonProps {
  onPhotoCapture: (photo: any) => void;
}

export const MyButton = ({ onPhotoCapture }: MyButtonProps) => {
  const checkAndRequestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const result = await check(PERMISSIONS.ANDROID.CAMERA);
      
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert('Error', 'La cámara no está disponible en este dispositivo');
          return false;
        case RESULTS.DENIED:
          const requestResult = await request(PERMISSIONS.ANDROID.CAMERA);
          return requestResult === RESULTS.GRANTED;
        case RESULTS.LIMITED:
        case RESULTS.GRANTED:
          return true;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permiso bloqueado',
            'El permiso de la cámara está bloqueado. Por favor, habilítalo en la configuración de la aplicación.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ]
          );
          return false;
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
      return false;
    }
  };

  const handleCameraLaunch = async () => {
    const hasPermission = await checkAndRequestCameraPermission();
    if (hasPermission) {
      const options: CameraOptions = {
        mediaType: 'photo',
        saveToPhotos: true,
        cameraType: 'back',
        includeBase64: false,
      };

      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert("Error", "No se pudo abrir la cámara. Por favor, intenta de nuevo.");
        } else if (response.assets && response.assets.length > 0) {
          onPhotoCapture(response.assets[0]);
        }
      });
    } else {
      console.log("No se pudo obtener el permiso de la cámara");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCameraLaunch}>
      <Text style={styles.buttonText}>Tomar Foto</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
