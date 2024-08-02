import axios from 'axios';
import { Alert } from 'react-native';


const API_BASE_URL = 'http://192.168.58.112:5000/api/photo';

export const savePhoto = async (photo: any, description: string) => {

  try {
    const formData = new FormData();
    formData.append('file', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('description', description);

    const response = await axios.post(`${API_BASE_URL}/guardar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
     
    });
    return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.error('Axios error details:',{
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.config,
      })
    }
  }
};


export const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/photos`, {
    });
    return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.error('Axios error details:',{
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.config,
      })
    }
  }
}


