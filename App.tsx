import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import Home from './screens/Home';
import TreinoDisplayScreen from './screens/TreinoDisplayScreen';
import { Exercicio, Treino } from './models/models';
import NovoExercicio from './screens/NovoExercicio';
import { clearAll } from './database/database';
import { store } from './store/storeConfig';
import { Provider } from 'react-redux'


export type RootStackParamList = {
  Home: undefined;
  TreinoDisplayScreen: undefined;
  NovoExercicio: undefined;
  // Add other screen names and their corresponding params if needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style='light' />
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false // Hide the header for all screens
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TreinoDisplayScreen" component={TreinoDisplayScreen} />
          <Stack.Screen name="NovoExercicio" component={NovoExercicio}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


