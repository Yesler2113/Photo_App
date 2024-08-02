import axios from 'axios';


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
    console.error('Error saving photo:', error);
    throw error;
  }
};


export const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/photos`, {
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};
