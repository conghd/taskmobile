// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { login } from '../services/api';
import { AuthContext } from '../App';

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState('Michael');
  const [email, setEmail] = useState('conghd@gmail.com');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const { token, user } = await login(name, email);
      console.log(token);
      console.log(user);
      setUser(user);
      navigation.replace('Home');
    } catch (err) {
      setError('Invalid name or email');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>Login</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4' },
  innerContainer: { width: '80%', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  input: { backgroundColor: 'white', padding: 10, marginBottom: 10, borderRadius: 5, width: '100%' },
  loginButton: { marginTop: 10, backgroundColor: '#007bff', width: '100%' }
});


export default LoginScreen;