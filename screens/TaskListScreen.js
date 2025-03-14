import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import { fetchTasks } from '../services/api';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadTasks(1, statusFilter);
  }, [statusFilter]);

  const loadTasks = async (pageNum, status) => {
    const data = await fetchTasks(page);
    if (pageNum === 1) {
      setTasks(data);
    } else {
      setTasks((prev) => [...prev, ...data]);
    }
    
    setHasMore(page >= data.totalPages > 0);
  };

  const handleLoadMore = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadTasks(nextPage, statusFilter);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Button mode={statusFilter === '' ? 'contained' : 'outlined'} onPress={() => setStatusFilter('')}>All</Button>
        <Button mode={statusFilter === 'To do' ? 'contained' : 'outlined'} onPress={() => setStatusFilter('To do')}>To do</Button>
        <Button mode={statusFilter === 'In progress' ? 'contained' : 'outlined'} onPress={() => setStatusFilter('In progress')}>In progress</Button>
        <Button mode={statusFilter === 'Done' ? 'contained' : 'outlined'} onPress={() => setStatusFilter('Done')}>Done</Button>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />

      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('CreateTask')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  taskContainer: { padding: 10, marginVertical: 5, backgroundColor: 'white', borderRadius: 5 },
  title: { fontSize: 18, fontWeight: 'bold' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#007bff' }
});

export default TaskListScreen;