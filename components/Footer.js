import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
        <Text style={styles.menuText}>@2024 product</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 80,
    backgroundColor: '#6200ee',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Footer;
