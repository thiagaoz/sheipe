import { StyleSheet, Text, TouchableOpacity, View, Modal, Alert, Button, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react'
import TreinosTable from '../components/TreinosTable';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import {VERDE_CLARO, CINZA_ESCURO, CINZA_CLARO, CINZA_MODAL, VERMELHO_CANCEL, VERDE_OK} from '../styles/colors';
import CustomButton from '../components/CustomButton';
import NovoTreinoModal from './NovoTreinoModal';
import AppHeader from '../components/AppHeader';
import { push, pull ,legs, setIndexInTreinos, Treino } from '../models/models';
import { store, resetTreino, resetExercicio, adicionarTreino, carregaTreinos, resetStore } from '../store/storeConfig';
import * as db from '../database/database'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import ClickableIcon from '../components/ClicklabIecon';

interface Props {
  treinos: Treino[],
}

export default function ReordernarTreinos({treinos}:Props) {


  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch()

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [treinosWasEdited, setTreinosWasEdited] = useState<boolean>(false)
  const [treinosNew, setTreinosNew] = useState<Treino[]>([...treinos])
  let treinoTemp = new Treino('')

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    console.log('------------ treinos / treinosNew --------------')
    
    for(let i= 0 ; i < treinos.length; i++ ){
      console.log(`[${i}] ${treinos[i].nome}(${treinos[i].index}) | ${treinosNew[i].nome}(${treinosNew[i].index})`)
    }
    console.log('------------------------------------')
  }, [treinosNew]);

  const treinoUp = (i:number) => {
    treinoTemp = {...treinosNew[i]}
    treinosNew[i] = {...treinosNew[i-1]}
    treinosNew[i-1] = {...treinoTemp}
    const indexedArr = setIndexInTreinos(treinosNew)
    setTreinosNew([...indexedArr])
    setTreinosWasEdited(true)
  }

  const treinoDown = (i: number) => {
    treinoTemp = {...treinosNew[i]}
    treinosNew[i] = {...treinosNew[i+1]}
    treinosNew[i+1] = {...treinoTemp}
    const indexedArr = setIndexInTreinos(treinosNew)
    setTreinosNew([...indexedArr])
    setTreinosWasEdited(true)
  }

  // Salva na database
  const handleSalvar = () => { 
    dispatch(carregaTreinos([...treinosNew]))
    navigation.goBack()
  }

  const handleCancelar = () => {
    navigation.goBack()
  }

  const handleBackButton = () => { 
    handleCancelar()
    return true
  }

  return (
    <View style={styles.container}>
        <AppHeader />
        
        <View >
        <View style={styles.titulo_container}>
            <Text style={styles.titulo}>Reordernar Treinos</Text>
        </View>

      {treinosNew.length!==0&&
        treinosNew.map( treino => (
          <View style={styles.treino_row_container} key={treino.key}>
            {treino.index!==0 ?
              <TouchableOpacity onPress={()=>treinoUp(treino.index)}>
                <Icon name='arrow-up' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <Icon name='arrow-up' size={30} color={CINZA_CLARO} />
              </TouchableOpacity>
            }

            <TouchableOpacity style={styles.treinos_row} >
              <Text style={styles.treino_row_text}>{treino.nome}</Text>
            </TouchableOpacity>

            {treino.index < treinosNew.length-1 ?
              <TouchableOpacity onPress={()=>treinoDown(treino.index)}>
                <Icon name='arrow-down' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <Icon name='arrow-down' size={30} color={CINZA_CLARO} />
              </TouchableOpacity>
            }
          </View>
        ))
      }
      <View style={styles.save_cancel_container}>
        {treinosWasEdited?
          <CustomButton style={styles.button_ok} title='Salvar' onPress={()=>handleSalvar()}/>
          :
          <CustomButton style={styles.button_off} title='Salvar' />
        }
        <CustomButton style={styles.button_cancel} title='Cancelar' onPress={() => handleCancelar()} />
      </View>
    </View>
        {modalVisible &&
          <NovoTreinoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        }

      </View>
  )
}

const styles = StyleSheet.create({
  container:{
      backgroundColor: CINZA_ESCURO,
      flex: 1
  },
  titulo_container:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titulo:{
      color: 'white',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 15,
  },
  edit_icon_container:{
    marginTop: 3,
    right: 20,
    borderColor:'red',
    borderRadius: 5,
    position: 'absolute'
  },
  treinos_row:{
    marginBottom: 5,
    paddingBottom: 4,
    paddingTop: 4,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: CINZA_CLARO,
    alignSelf: 'center',
    width: '75%'
  },
  treino_row_text:{
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  editar_button:{
    backgroundColor: VERDE_CLARO,
    color: CINZA_ESCURO
  },
  treino_row_container:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  save_cancel_container:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30
  },
  button_cancel:{
    backgroundColor: VERMELHO_CANCEL,
    width: 100
  },
  button_ok:{
    backgroundColor: VERDE_OK,
    width: 100
  },
  button_off:{
    backgroundColor: CINZA_CLARO,
    width: 100,
  },
})