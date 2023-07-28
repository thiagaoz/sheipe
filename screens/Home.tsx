import { StyleSheet, Text, TouchableOpacity, View, Modal, Alert, Button } from 'react-native';
import React, { useEffect, useState } from 'react'
import TreinosTable from '../components/TreinosTable';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import {VERDE_CLARO, CINZA_ESCURO, CINZA_CLARO, CINZA_MODAL, VERMELHO_CANCEL, VERDE_OK} from '../styles/colors';
import CustomButton from '../components/CustomButton';
import NovoTreinoModal from './NovoTreinoModal';
import AppHeader from '../components/AppHeader';
import { Treino } from '../models/models';
import { store, resetTreino, resetExercicio, adicionarTreino, carregaTreinos } from '../store/storeConfig';
import * as db from '../database/database'
import { useAppSelector, useAppDispatch } from '../store/hooks';


export default function Home() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch()


  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const treinos = useAppSelector((state) => state.treino.treinosArr)
  const exercicio = useAppSelector((state)=> state.exercicio.atual)

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.getAllTreinos()
      if (data) {
        console.log('Treinos recuperados da DB: ' + data.length)
        dispatch(carregaTreinos(data))
      }
    }
    fetchData()
  }, []);

  {/*------ APENAS PARA TESTES
  const currentStore = () => { 
    const storeValue = store.getState().treino.treinosArr
    console.log('---------------- REDUX STORE -----------------------')
    console.log('Treino Store length: ' +storeValue.length)
    for (let i=0; i<storeValue.length; i++){
      console.log(`${i+1}) Nome: ${storeValue[i].nome} / Excs: ${storeValue[i].exercicios.length}`)
    }
  }

  const currentDatabase = async () => { 
    const treinos = await db.getAllTreinos();
    console.log('---------------- DATABASE -------------------')
    console.log('Treinos armazenados: ' + treinos.length)
    treinos.forEach(treino => {
      console.log('Nome: ' +treino.nome+' / Excs: ' +treino.exercicios.length)
    })
  }

  const clearData = async () => {
    try {
      db.clearAll();
      dispatch(resetTreino())        
      dispatch(resetExercicio())
      console.log('=============== CLEARED =======================')

    } catch (e) {
      console.log('Failed to clear data:', e);
    }
  };
  */}
  

  return (
    <View style={styles.container}>
        <AppHeader />
        <TreinosTable />
        <TouchableOpacity onPress={()=> {setModalVisible(!modalVisible)}}>
          <Text style={styles.mais_treino}>+ Treino</Text>
        </TouchableOpacity>

        {/*------ APENAS PARA TESTES
        <CustomButton style={styles.button_teste} title='REDUX STORE' onPress={()=>currentStore()}/>
        <CustomButton style={styles.button_teste} title='DATABASE' onPress={()=>currentDatabase()}/>
        <CustomButton style={styles.button_teste} title='CLEAR DB' onPress={()=>clearData()}/>
        */}
        {modalVisible &&
          <NovoTreinoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        }

      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: CINZA_ESCURO,
    },
    mais_treino:{
      backgroundColor: VERDE_CLARO,
      alignSelf: 'center',
      marginTop: 10,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 15,
      borderRadius: 5,
    },
    button_teste:{
      marginTop: 10
    }

  });