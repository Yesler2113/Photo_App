import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { savePhoto, getPhotos } from '../components/Api';
import { MyButton } from '../components/MyButton';


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

  // const handlePhotoCapture = async (photo: any) => {
  //   try {
  //     await savePhoto(photo, description);
  //     setDescription('');
  //     fetchPhotos();
  //   } catch (error) {
  //     console.error('Error saving photo:', error);
  //   }
  // };
  const handleSavePhoto = async (photo: any, description: string) => {
    try {
      const data = await savePhoto(photo, description);
      console.log('Photo saved:', data);
      fetchPhotos(); // Refetch photos after saving a new one
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


  // return (
  //   <View style={styles.container}>
  //     <TextInput
  //       style={styles.input}
  //       value={description}
  //       onChangeText={setDescription}
  //       placeholder="Enter photo description"
  //     />
  //     <MyButton onPhotoCapture={handlePhotoCapture} />
  //     <FlatList
  //       data={photos}
  //       renderItem={renderPhoto}
  //       keyExtractor={(item) => item.id}
  //     />
  //   </View>
  // );
  return (
    <View style={styles.container}>
      <MyButton onPhotoCapture={(photo) => handleSavePhoto(photo, 'Descripción de prueba')} />
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image source={{ uri: item.url }} style={styles.photo} />
            <Text>{item.description}</Text>
          </View>
        )}
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

