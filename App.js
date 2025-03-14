import React, { useState, useContext, createContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import TaskListScreen from './screens/TaskListScreen';
import ProfileScreen from './screens/ProfileScreen';

const AuthContext = createContext();
const Tab = createBottomTabNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout: () => setUser(null) }}>
      <NavigationContainer>
        {user ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={TaskListScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="home" color={color} size={size} />
                )
              }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="person" color={color} size={size} />
                )
              }}
              />
          </Tab.Navigator>
        ) : (
          <LoginScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default App;