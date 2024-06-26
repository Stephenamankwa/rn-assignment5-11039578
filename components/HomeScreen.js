// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>Eric Atsu</Text>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Card Info</Title>
          <Paragraph>Details about the card...</Paragraph>
        </Card.Content>
      </Card>
      {/* Add other components like Transaction List */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userInfo: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    color: '#888',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
  },
});

export default HomeScreen;
