  import { StyleSheet, TextInput, View, Modal, Alert, Keyboard, Text, TouchableWithoutFeedback} from 'react-native';
import CustomButton from '../components/CustomButton';
import {VERDE_CLARO, CINZA_ESCURO, CINZA_CLARO, CINZA_MODAL, VERMELHO_CANCEL, VERDE_OK} from '../styles/colors';
import React, { useEffect, useRef, useState } from 'react'
import * as db from '../database/database'
import { Exercicio, Treino, setIndexInExercicios, setIndexInTreinos } from '../models/models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { adicionarTreino, carregaTreinos, editarTreino, resetTreino } from '../store/storeConfig';
import Exercicios from '../components/Exercicios';
import ClickableIcon from '../components/ClicklabIecon';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type


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
  const exercicios = useAppSelector( (state) => state.treino.atual.exercicios)
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch()
  
  const [inputText, setInputText] = useState<string>('')
  const [treinoAltered, setTreinoAltered] = useState<boolean>(false)
  const [isInputOnFocus, setIsInputOnFocus] = useState<boolean>(false)
  const [treinoOld, setTreinoOld] = useState<Treino>()
  const inputRef = useRef<TextInput | null>(null);

  

  useEffect(() => {
  
    if(modoEditar){
      setInputText(treino.nome)
      setTreinoOld({...treino})
    }else{
      dispatch(resetTreino())
    }
  
  }, [])
  
  const handleNomeChange = (text:string) => { 
    setInputText(text)
    setTreinoAltered(true)
  }

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

  const exercicioUp = (index: number) => { 
    const exerciciosNew = [...exercicios]
    exerciciosNew[index -1] = exercicios[index]
    exerciciosNew[index -1].index = index - 1
    exerciciosNew[index] = exercicios[index - 1]
    exerciciosNew[index].index = index
    setTreinoAltered(true)
    dispatch(editarTreino({...treino, exercicios: [...exerciciosNew]}))
    
  }

  const exercicioDown = (index: number) => { 
    const exerciciosNew = [...exercicios]
    exerciciosNew[index +1] = exercicios[index]
    exerciciosNew[index +1].index = index + 1
    exerciciosNew[index] = exercicios[index + 1]
    exerciciosNew[index].index = index
    setTreinoAltered(true)
    dispatch(editarTreino({...treino, exercicios: [...exerciciosNew]}))
    
  }

  const handleCancelar = () => { 
    if(treinoAltered&&treinoOld){
      const exerciciosIndexed:Exercicio[] = setIndexInExercicios(treinoOld.exercicios)
      dispatch(editarTreino({...treinoOld, exercicios: [...exerciciosIndexed]}))
    }
    setModalVisible(!modalVisible)
  }

  const handleDeleteTreino = async () => {
    const treinosNew:Treino[] = []
    for (let i =0 ; i<treinos.length; i++) {
      if(treino.index !== i){
        treinosNew.push(treinos[i])
      }
    }
    const treinosIndexed :Treino[] = setIndexInTreinos(treinosNew)
    await db.deleteTreinoDB(treino.key)
    if(treinosIndexed.length > 0){
      treinosIndexed.sort((a,b) => a.index - b.index)
      await db.multiSalvaTreino(treinosIndexed)
    }
    dispatch(carregaTreinos([...treinosIndexed]))
    navigation.goBack()
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
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        //onShow={handleOnShow}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={styles.modal_container}>
              <TouchableWithoutFeedback onPress={()=> {} }>
                <TextInput
                  ref={inputRef}

                  style={styles.input_field} 
                  placeholder='Nome do treino'
                  value={inputText}
                  onChangeText={(text) => handleNomeChange(text)}
                  autoFocus={false}
                  onFocus={()=> setIsInputOnFocus(true)}
                />
              </TouchableWithoutFeedback>
            {treino.exercicios.length !== 0&& 
              exercicios.map((exercicio) => {
                return (
                  <View style={styles.exercicios_row} key={exercicio.key}>
                    {exercicio.index!==0?
                      <ClickableIcon name='arrow-up' size={30} color={VERDE_CLARO} style={styles.arrows} onPress={()=>exercicioUp(exercicio.index)}/>
                    :
                      <ClickableIcon name='arrow-up' size={30} color={CINZA_ESCURO} style={styles.arrows} />
                    
                    }
                    <Text style={styles.exercicio_nome}>{exercicio.nome}</Text>
                    {exercicio.index!==exercicios.length-1?
                      <ClickableIcon name='arrow-down' size={30} color={VERDE_CLARO}  style={styles.arrows} onPress={()=>exercicioDown(exercicio.index)}/>
                      :
                      <ClickableIcon name='arrow-down' size={30} color={CINZA_ESCURO}  style={styles.arrows}/>  
                    }
                    
                  </View>)
              })
            }
              <View style={styles.modal_buttons_container}>
                {
                !inputText||!treinoAltered?
                  <CustomButton style={styles.button_off} title='Salvar' />
                  :
                  <CustomButton style={styles.button_ok} title='Salvar' onPress={ modoEditar? handleEditarTreino : handleNovoTreino}/>
                }
                <CustomButton style={styles.button_cancel} title='Cancelar' onPress={() => handleCancelar()} />
              </View>
              {modoEditar&&
                <ClickableIcon name='trash' color={VERMELHO_CANCEL} size={40} style={styles.trash_icon} onPress={()=>deleteTreinoAlert(treino.nome)}/>
              }
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  )
}

const styles = StyleSheet.create({
  modal_container: {
    backgroundColor: CINZA_CLARO,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 100,
    minHeight: 300,
    width: 370,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    zIndex: 0,
    position: 'absolute'
  },
  modal_buttons_container:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 50
  },
  input_field:{
    fontSize: 20,
    margin: 5,
    paddingLeft:30,
    paddingRight: 30,
    backgroundColor: '#d9d6d6',
    minWidth: 200,
    textAlign: 'center'
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
  exercicios_row:{
    flexDirection: 'row',
    marginTop: 10,
  },
  exercicio_nome: {
    color: CINZA_ESCURO,
    backgroundColor: VERDE_CLARO,
    fontSize: 20,
    fontWeight: '400',
    marginLeft:15,
    marginRight: 15, 
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
    minHeight: 35,
    width: 250
  },
  arrows:{
    justifyContent: 'center'
  },
  trash_icon:{
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    backgroundColor: CINZA_ESCURO
  }
});