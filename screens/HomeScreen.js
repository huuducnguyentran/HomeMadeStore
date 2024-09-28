import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [artTools, setArtTools] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch art tools from the API
    axios.get('https://66ea503855ad32cda4785559.mockapi.io/art-tools')
      .then(response => setArtTools(response.data))
      .catch(error => console.error(error));

    // Load favorites from AsyncStorage
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  };

  const isFavorite = (artTool) => {
    return favorites.some(fav => fav.id === artTool.id);
  };

  const toggleFavorite = async (artTool) => {
    let updatedFavorites = [];

    if (isFavorite(artTool)) {
      updatedFavorites = favorites.filter(fav => fav.id !== artTool.id);
      Alert.alert('Removed from Favorites', `${artTool.artName} has been removed from your favorites.`);
    } else {
      updatedFavorites = [...favorites, artTool];
      Alert.alert('Added to Favorites', `${artTool.artName} has been added to your favorites.`);
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const navigateToDetail = (artTool) => {
    navigation.navigate('Detail', { artTool });
  };

  const renderArtTool = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigateToDetail(item)}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.artName}</Text>
          <Text style={styles.price}>${item.price}</Text>
          {item.limitedTimeDeal > 0 && (
            <Text style={styles.deal}>{Math.round(item.limitedTimeDeal * 100)}% Off</Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => toggleFavorite(item)}>
          <Text style={styles.buttonText}>
            {isFavorite(item) ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Icon name={isFavorite(item) ? "heart" : "heart-o"} size={24} color="#6200ee" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Art Tools" />   
      <FlatList
        data={artTools}
        keyExtractor={item => item.id}
        renderItem={renderArtTool}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listContent: {
    paddingBottom: 100, 
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    padding: 10,
  },
  image: {
    height: 150,
    width: '100%',
    borderRadius: 10,
  },
  content: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'medium',
    marginTop: 5,
  },
  deal: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
