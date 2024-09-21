// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = () => {
  const [artTools, setArtTools] = useState([]);

  useEffect(() => {
    axios.get('https://66ea503855ad32cda4785559.mockapi.io/art-tools')
      .then(response => setArtTools(response.data))
      .catch(error => console.error(error));
  }, []);

  const renderArtTool = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.artName}</Text>
        <Text style={styles.price}>${item.price}</Text>
        {item.limitedTimeDeal > 0 && (
          <Text style={styles.deal}>{Math.round(item.limitedTimeDeal * 100)}% Off</Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="heart" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header title="Art Tools" />
      
      {/* FlatList for content */}
      <FlatList
        data={artTools}
        keyExtractor={item => item.id}
        renderItem={renderArtTool}
        contentContainerStyle={styles.listContent}
      />

      {/* Footer Component */}
      <Footer />
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
