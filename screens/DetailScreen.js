import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailScreen = ({ route }) => {
  const { artTool } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav.id === artTool.id));
  };

  const toggleFavorite = async () => {
    const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== artTool.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(artTool);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: artTool.image }} style={styles.image} />
      <Text style={styles.title}>{artTool.artName}</Text>
      <Text style={styles.price}>${artTool.price}</Text>
      {artTool.limitedTimeDeal > 0 && (
        <Text style={styles.deal}>{Math.round(artTool.limitedTimeDeal * 100)}% Off</Text>
      )}
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} size={24} color="#6200ee" />
        <Text>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
  },
  deal: {
    fontSize: 16,
    color: 'green',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default DetailScreen;
