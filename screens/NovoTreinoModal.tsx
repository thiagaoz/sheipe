import { StyleSheet, TextInput, View, Modal, Alert, Keyboard, } from 'react-native';
import CustomButton from '../components/CustomButton';
import {VERDE_CLARO, CINZA_ESCURO, CINZA_CLARO, CINZA_MODAL, VERMELHO_CANCEL, VERDE_OK} from '../styles/colors';
import React, { useEffect, useRef, useState } from 'react'
import * as db from '../database/database'
import { Treino } from '../models/models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { adicionarTreino, editarTreino } from '../store/storeConfig';


interface Props{
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  modoEditar?: boolean,
}

NovoTreino.defaultProps = {
  modoEditar: false
}

export default function NovoTreino({modalVisible, setModalVisible, modoEditar}: Props) {
  
  const treinos = useAppSelector((state)=> state.treino.treinosArr)
  const treino = useAppSelector((state) => state.treino.atual)
  const dispatch = useAppDispatch()
  
  const [inputText, setInputText] = useState<string>('')
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
  
    if(modoEditar){
      setInputText(treino.nome)
    }
  
  }, [])
  
  const handleEditarTreino = async () => { 
    const treinoAtualizado:Treino = {...treino, nome:inputText}
    await db.salvarTreino(treinoAtualizado) 
    dispatch(editarTreino({...treinoAtualizado}))
    setModalVisible(!modalVisible) 
    Keyboard.dismiss(); 
  }

  const handleNovoTreino = async () => {
    const treino = new Treino(inputText)
    treino.index = treinos.length;
    await db.salvarNovoTreino(treino)
    dispatch(adicionarTreino({...treino}))
    setModalVisible(!modalVisible) 
    Keyboard.dismiss(); 
  }

  const handleOnShow = () => {
    inputRef.current?.blur();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 5); // Delay the focus call by 200 milliseconds
  };

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onShow={handleOnShow}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal_container}>
          <TextInput
            ref={inputRef}

            style={styles.input_field} 
            placeholder='Nome do treino'
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            autoFocus={true}
          />
          <View style={styles.modal_buttons_container}>
            {
            !inputText?
              <CustomButton style={styles.button_off} title='Salvar' />
              :
              <CustomButton style={styles.button_ok} title='Salvar' onPress={ modoEditar? handleEditarTreino : handleNovoTreino}/>
            }
            <CustomButton style={styles.button_cancel} title='Cancelar' onPress={() => {setModalVisible(!modalVisible)}} />
          </View>
        </View>
      </Modal>
  )
}



const styles = StyleSheet.create({
  modal_container: {
    backgroundColor: CINZA_CLARO,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    height: 300,
    width: 300,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20
  },
  modal_buttons_container:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 50
  },
  input_field:{
    margin: 5,
    paddingLeft:30,
    paddingRight: 30,
    backgroundColor: '#d9d6d6',
    width: 200
  },
  button_off:{
    backgroundColor: CINZA_ESCURO,
    width: 100
  },
  button_ok:{
    backgroundColor: VERDE_OK,
    width: 100
  },
  button_cancel:{
    backgroundColor: VERMELHO_CANCEL,
    width: 100
  },
});