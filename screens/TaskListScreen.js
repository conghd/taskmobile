import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_API_URL = 'http://3.128.173.76:8080/api/tasks'; // Replace with your actual API URL

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        // Get user info and token from AsyncStorage
        const storedUser = JSON.parse(await AsyncStorage.getItem('user'));
        const token = await AsyncStorage.getItem('token');

        if (storedUser && token) {
          setUser(storedUser); // Set the user state
          
          // Fetch tasks with the authentication token
          const response = await axios.get(TASKS_API_URL, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in the request header
            },
          });

          setTasks(response.data.tasks); // Set the fetched tasks
        } else {
          setError('User not authenticated');
        }
      } catch (err) {
        setError('Failed to fetch tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTasks();
  }, []);

  const handleLogout = async () => {
    // Clear user data and token from AsyncStorage and navigate to Login screen
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  const renderTask = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Assigned to: {item.assignedTo?.name}</Text>
        <Text>Created by: {item.createdBy?.name}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {user ? (
        <Text variant="headlineSmall" style={styles.userInfo}>
          Welcome, {user.name} ({user.email})
        </Text>
      ) : null}

      <Text variant="headlineLarge" style={styles.title}>Task List</Text>

      {loading ? (
        <Text>Loading tasks...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item._id.toString()}
        />
      )}

      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default TaskListScreen;
