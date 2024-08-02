import axios from 'axios';
import { Alert } from 'react-native';

const API_BASE_URL = 'http://192.168.58.112:5137/api/photo';


interface PhotoDto {
  id: string;
  description: string;
  url: string;
  date: string;
}

interface ResponseDto<T> {
  status: boolean;
  message: string;
  data?: T;
}
interface FileWithUri {
  uri: string;
  name?: string;
  type?: string;
}


export const savePhoto = async (photo: FileWithUri, description: string): Promise<ResponseDto<PhotoDto>> => {
  const formData = new FormData();
  formData.append('file', {
    uri: photo.uri,
    type: photo.type || 'image/jpeg',
    name: photo.name || 'photo.jpg'
  });
  formData.append('description', description);

  try {
    const response = await axios.post<ResponseDto<PhotoDto>>(`${API_BASE_URL}/guardar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al guardar la foto:', error.response ? error.response.data : error);
    // Maneja el error devolviendo una estructura adecuada
    return {
    status: false,
    message: 'Error al conectar con el servidor o procesar la respuesta',
    data: undefined
    };
  }
};



export const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/photos`);
    return response.data.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.config,
      });
    }
  }
}
