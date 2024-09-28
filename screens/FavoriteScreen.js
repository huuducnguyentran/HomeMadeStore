import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  };

  const removeFavorite = async (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const clearFavorites = async () => {
    await AsyncStorage.removeItem('favorites');
    setFavorites([]);
  };

  const renderFavorite = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.artName}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
        <Icon name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={renderFavorite}
        ListEmptyComponent={<Text>No favorites yet.</Text>}
      />
      <TouchableOpacity onPress={clearFavorites} style={styles.clearButton}>
        <Text>Clear All Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
  clearButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default FavoriteScreen;
