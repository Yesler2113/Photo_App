import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { savePhoto, getPhotos } from '../components/Api';
import { MyButton } from '../components/MyButton';

interface Photo {
  id: string;
  description: string;
  url: string;
  date: string;
  filename?: string;
}

export const HomeScreen = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const fetchedPhotos = await getPhotos();
      setPhotos(fetchedPhotos);
      setLoading(false);
    } catch (error) {
      setError('Error fetching photos');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handlePhotoCapture = async (photo: any) => {
    setLoading(true);
    try {
      await savePhoto(photo, description);
      setDescription('');
      fetchPhotos();  
    } catch (error) {
      setError('Error saving photo');
    } finally {
      setLoading(false);
    }
  };

  const formDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  const renderPhoto = ({ item }: { item: Photo }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.url }} style={styles.photo} />
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.description}>{formDate(item.date)}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    Alert.alert('Error', error);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="La descripcion es obligatoria"
      />
      <MyButton onPhotoCapture={handlePhotoCapture} />
      <View>
        <Text>Tus Fotos</Text>
      </View>
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




