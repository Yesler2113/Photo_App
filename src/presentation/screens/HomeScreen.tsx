import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, Alert, Pressable, Button } from 'react-native';
import { savePhoto, getPhotos } from '../components/Api';
import { MyButton } from '../components/MyButton';
import axios from 'axios';


interface Photo {
  id: string;
  description: string;
  url: string;
  date: string;
}

export const HomeScreen = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await getPhotos();
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handlePhotoCapture = async (photo: any) => {
    try {
      await savePhoto(photo, description);
      setDescription('');
      fetchPhotos();
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  };

  

  const renderPhoto = ({ item }: { item: Photo }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.url }} style={styles.photo} />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  //probar
  const checkApiAccess = async () => {
    try {
      const response = await axios.get('http://192.168.58.112:5000//api/photo/photos');
      if (response.status === 200) {
        Alert.alert('Success', 'API is accessible');
        console.log('API is accessible');
      } else {
        Alert.alert('Error', `API responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error accessing API:', error);
      Alert.alert('Error', `Failed to access API:`);
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter photo description"
      />
      <MyButton onPhotoCapture={handlePhotoCapture} />
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  photoContainer: {
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  description: {
    marginTop: 5,
  },
});





