import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './screens/Home';
import TreinoDisplayScreen from './screens/TreinoDisplayScreen';
import InfoScreen from './screens/InfoScreen';
import NovoExercicio from './screens/NovoExercicio';
import { store } from './store/storeConfig';
import { Provider } from 'react-redux'
import ReordernarTreinos from './screens/ReordernarTreinos';
import { Treino } from './models/models';


export type RootStackParamList = {
  Home: undefined;
  TreinoDisplayScreen: undefined;
  NovoExercicio: undefined;
  InfoScreen: undefined;
  ReordernarTreinos: {treinos: Treino[]};
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
          <Stack.Screen name="InfoScreen" component={InfoScreen} />
          <Stack.Screen name="ReordernarTreinos">
            {props => <ReordernarTreinos {...props} treinos={props.route.params.treinos}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


