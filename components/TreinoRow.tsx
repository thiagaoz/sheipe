import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import React, { useState } from 'react'
import Exercicios from './Exercicios'
import { Treino } from '../models/models'
import { BRANCO } from '../styles/colors'
import { store, setTreinoAtual } from '../store/storeConfig';
import NovoTreinoModal from '../screens/NovoTreinoModal';


interface Props{
    treino: Treino
}

export default function TreinoRow({treino}:Props) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [editTreinoModal, setEditTreinoModal] = useState<boolean>(false)

  const handleCliqueTreino = () => { 
    store.dispatch(setTreinoAtual(treino))
    navigation.navigate('TreinoDisplayScreen')
  }

  const deleteTreinoAlert = () => { 
    console.log('Alertado!')
    Alert.alert(
      'Alert Title',
      'Alert message',
      [
        {text: 'OK'},
        {text: 'Cancel', style: 'cancel'}
      ]
    )
  }

  return (
    <View  style={styles.container}>
        <TouchableOpacity
          onPress={()=> handleCliqueTreino()}
        >
            <Text style={styles.nome}>{treino.nome}</Text>
        </TouchableOpacity>
        <View style={styles.emoji_container}>
          <TouchableOpacity onPress={()=>setEditTreinoModal(true)}>
            <Text style={styles.emoji}>✏️</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>deleteTreinoAlert}>
            <Text style={styles.emoji}>❌</Text>
          </TouchableOpacity>
        </View>

        {editTreinoModal &&
          <NovoTreinoModal modalVisible={editTreinoModal} setModalVisible={setEditTreinoModal} modoEditar={true}/>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row', 
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderWidth:0.5,
        borderColor: BRANCO,
        margin: 1
    },
    emoji_container:{
      flexDirection: 'row',
      alignSelf: 'center',
      
    },
    nome:{
      color: 'white',
      alignSelf: 'center',
      fontSize: 25,
      paddingLeft: 20
    },
    emoji:{
      fontSize: 20,
      
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderColor: 'white',
      borderWidth: 0.5
    }
})