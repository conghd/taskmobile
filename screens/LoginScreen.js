import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LOGIN_API_URL = 'http://3.128.173.76:8080/api/users/login';

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (name && email) {
      try {
        // Send POST request to login API
        const response = await axios.post(LOGIN_API_URL, { name, email });

        // If login is successful, save user info and token in AsyncStorage
        if (response.data.token && response.data.user) {
          const { token, user } = response.data;
          await AsyncStorage.setItem('user', JSON.stringify(user)); // Save user info
          await AsyncStorage.setItem('token', token); // Save token

          // Navigate to Task List screen
          navigation.replace('TaskList');
        }
      } catch (err) {
        setError('Login failed. Please check your credentials and try again.');
      }
    } else {
      setError('Please enter both name and email.');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Login</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      {error && <HelperText type="error">{error}</HelperText>}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default LoginScreen;
