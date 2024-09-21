// Footer.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => alert('Home')}>
        <Icon name="home" size={24} color="#fff" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => alert('Favorites')}>
        <Icon name="heart" size={24} color="#fff" />
        <Text style={styles.menuText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 80,
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Footer;
