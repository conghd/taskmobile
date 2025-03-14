import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../App';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileText}>Name: {user.name}</Text>
      <Text style={styles.profileText}>Email: {user.email}</Text>
      <Button mode="contained" onPress={logout} style={styles.logoutButton}>Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileText: { fontSize: 18, marginBottom: 10 },
  logoutButton: { marginTop: 20, backgroundColor: 'red' }
});

export default ProfileScreen;