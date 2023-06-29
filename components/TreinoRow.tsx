import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import React from 'react'
import Exercicios from './Exercicios'
import { Treino } from '../models/models'
import { BRANCO } from '../styles/colors'
import { store, setTreinoAtual } from '../store/storeConfig';

interface Props{
    treino: Treino
}

export default function TreinoRow({treino}:Props) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleCliqueTreino = () => { 
    store.dispatch(setTreinoAtual(treino))
    navigation.navigate('TreinoDisplayScreen')
  }

  return (
    <View>
        <TouchableOpacity style={styles.container}
          onPress={()=> handleCliqueTreino()}
        >
            <Text style={styles.nome}>{treino.nome}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row', 
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        borderWidth:1,
        borderColor: BRANCO,
        margin: 1
      },
      nome:{
        color: 'white',
        alignSelf: 'center',
        fontSize: 25,
        paddingLeft: 20
    }
})