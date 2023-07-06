import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import React, { useState } from 'react'
import Exercicios from './Exercicios'
import { Treino } from '../models/models'
import { BRANCO } from '../styles/colors'
import { store, setTreinoAtual, carregaTreinos } from '../store/storeConfig';
import NovoTreinoModal from '../screens/NovoTreinoModal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import * as db from '../database/database'



interface Props{
    treino: Treino,
}

export default function TreinoRow({treino}:Props) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [editTreinoModal, setEditTreinoModal] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  //const treinoState = useAppSelector((state) => state.treino.atual)
  const treinos = useAppSelector((state)=> state.treino.treinosArr)

  const handleCliqueTreino = () => { 
    dispatch(setTreinoAtual(treino))
    navigation.navigate('TreinoDisplayScreen')
  }

  const handleEditTreino = () => {
    dispatch(setTreinoAtual({...treino})) 
    setEditTreinoModal(true)

  }
  const handleDeleteTreino = async () => {
    const treinosAtualizados:Treino[] = []
    for(let i=0 ; i < treinos.length ; i++){
      if(i !== treino.index){
        treinosAtualizados.push(treinos[i])
      }
    }
    await db.deleteTreinoDB(treino.key)
    if(treinosAtualizados.length > 0){
      treinosAtualizados.sort((a,b) => a.index - b.index)
      await db.multiSalvaTreino(treinosAtualizados)
    }
    dispatch(carregaTreinos([...treinosAtualizados]))
  }

  const deleteTreinoAlert = (txt:string) => { 
    Alert.alert(
      'Deletar Treino',
      'Você quer deletar o treino "' + txt+ ' " ?',
      [
        {
          text: 'SIM',
          onPress: () => handleDeleteTreino()
        },
        {text: 'NÃO', style: 'cancel'}
      ]
    )
  }

  return (
    <View  style={styles.container}>
        <TouchableOpacity style={styles.nome_container}
          onPress={()=> handleCliqueTreino()}
        >
            <Text style={styles.nome}>{treino.nome}</Text>
        </TouchableOpacity>
        
        <View style={styles.emoji_container}>
          <TouchableOpacity onPress={()=>handleEditTreino()}>
            <Text style={styles.emoji}>✏️</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>deleteTreinoAlert(treino.nome)}>
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
    },
    emoji_container:{
      flexDirection: 'row',
      alignSelf: 'center',
      
    },
    nome_container:{
      flex:1,
      borderWidth:0.5,
      borderColor: BRANCO,
    },
    nome:{
      color: 'white',
      alignSelf: 'flex-start',
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