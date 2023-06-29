import { StyleSheet, Text, TouchableOpacity, View, Modal, Alert, Button, TextInput, TextInputFocusEventData, NativeSyntheticEvent } from 'react-native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import React, { useEffect, useRef, useState } from 'react'
import {VERDE_CLARO, CINZA_ESCURO, CINZA_CLARO, CINZA_MODAL, VERMELHO_CANCEL, VERDE_OK} from '../styles/colors';
import AppHeader from '../components/AppHeader';
import CustomButton from '../components/CustomButton';
import CampoMusculo from '../components/CampoMusculo';
import SelecionaMusculoModal from '../components/SelecionaMusculoModal';
import { Exercicio, Treino } from '../models/models';
import { adicionarExercicio, editarTreino} from '../store/storeConfig';
import { useDispatch } from 'react-redux'
import * as db from '../database/database';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { createAsyncThunk } from '@reduxjs/toolkit';



export default function NovoExercicio() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [musculo, setMusculo] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [sets, setSets] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [carga, setCarga] = useState<string>('');

  const setsRef = useRef<TextInput>(null);
  const repsRef = useRef<TextInput>(null);
  const cargaRef = useRef<TextInput>(null);

  const treino = useAppSelector((state) => state.treino.atual)
  const exercicio = useAppSelector((state) => state.exercicio.atual)
  const dispatch = useAppDispatch()

  useEffect(() => {
    
    if(exercicio){
      setNome(exercicio.nome)
      setMusculo(exercicio.musculo)
      setSets(exercicio.sets.toString())
      setReps(exercicio.reps.toString())
      setCarga(exercicio.carga.toString())
    }

  }, [])
  
  const handleEditarExercicio = async () => { 
    const exercicioAtualizado = {
      nome: nome,
      musculo: musculo,
      sets: parseInt(sets),
      reps: parseInt(reps),
      carga: parseInt(carga),
      key: exercicio!.key,
      status: exercicio!.status
    }
    const novoExerciciosArr: Exercicio[] = []
    treino.exercicios.forEach( exercicio => {
      if(exercicio.key === exercicioAtualizado.key) {
         novoExerciciosArr.push(exercicioAtualizado)
      } else {
        novoExerciciosArr.push(exercicio)
      }
    })
    const treinoAtualizado = {...treino, exercicios: novoExerciciosArr}
    await db.salvarTreino(treinoAtualizado)
    dispatch(editarTreino({...treinoAtualizado}))
    navigation.goBack()
  }

  const handleNovoExercicio = async () => {
    let exercicio:Exercicio
    if(!nome && !musculo && !sets && !reps && !carga){
      exercicio = new Exercicio ('Supino','Peito','3','10','50')
    }else{
      exercicio = new Exercicio(nome, musculo, sets, reps, carga) 
    }

    const novoExerciciosArr: Exercicio[]  = [...treino.exercicios]
    novoExerciciosArr.push(exercicio)
    const treinoAtualizado = {...treino, exercicios: novoExerciciosArr}
    await db.salvarTreino(treinoAtualizado)
    dispatch(adicionarExercicio({...exercicio}))

    navigation.goBack()
  }

  const handleFocus = (ref: React.RefObject<TextInput>, text: string ) => { 
    if(ref.current){
        requestAnimationFrame(() => {
          ref.current?.setNativeProps({
            selection: { start: text.length, end: text.length },
          });
        });
    }
  }

  return(
    <View style={styles.container}>
      <AppHeader />
      <Text style={styles.titulo}>Novo Exercício</Text>
      <View style={styles.form_container}>
      <TextInput
          style={styles.nome_field} 
          placeholder='Nome'
          value={nome}
          onChangeText={(text)=>{ setNome(text)} }
        />
        <CampoMusculo  modalVisible={modalVisible} setModalVisible={setModalVisible} musculo={musculo} setMusculo={setMusculo}/>
        {modalVisible &&
          <SelecionaMusculoModal modalVisible={modalVisible} setModalVisible={setModalVisible} musculo={musculo} setMusculo={setMusculo} />
        }

        <View style={styles.label_numero_container}>
          <View style={styles.sets_container}>
            <Text style={styles.texto}>SETS</Text>
            <TextInput
              style={styles.numero_field} 
              keyboardType='numeric'
              placeholder='3'
              value={sets}
              onChangeText={ text => {setSets(text)}}
              onSubmitEditing={()=>setsRef.current?.focus()}
            />
          </View>
          <View style={styles.sets_container}>
            <Text style={styles.texto}>REPS</Text>
            <TextInput
              style={styles.numero_field} 
              keyboardType='numeric'
              placeholder='12'
              ref={repsRef}
              value={reps}
              onChangeText={text => setReps(text)}
              onSubmitEditing={()=>cargaRef.current?.focus()}
              
            />
          </View>
          <View style={styles.sets_container}>
            <Text style={styles.texto}>CARGA</Text>
            <TextInput
              style={styles.numero_field} 
              keyboardType='numeric'
              placeholder='50'
              ref={cargaRef}
              value={carga}
              onChangeText={ text => setCarga(text)}
              onFocus={()=>handleFocus(cargaRef, carga)}
            />
          </View>
        </View>
        <View style={styles.modal_buttons_container}>
          {exercicio?
          <CustomButton style={styles.button_ok} title='Editar' onPress={()=>handleEditarExercicio()}/>
          :
          <CustomButton style={styles.button_ok} title='Adicionar' onPress={()=>handleNovoExercicio()}/>
          }
          
          <CustomButton style={styles.button_cancel} title='Cancelar' onPress={() => navigation.goBack()}/>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CINZA_ESCURO,
  },
  form_container:{
    flex: 1,
    borderColor: 'white',
    borderWidth: 1
  },
  mais_treino:{
    backgroundColor: VERDE_CLARO,
    alignSelf: 'center',
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1
  },
  titulo:{
    color: 'white',
    alignSelf: 'center',
    fontSize: 25
  },
  nome_field:{
    margin: 5,
    paddingLeft:30,
    paddingRight: 30,
    backgroundColor: '#d9d6d6',
    fontSize: 20,
    width: '80%',
    alignSelf: 'center'
  },
  label_numero_container: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sets_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 140
  },
  numero_field:{
    margin: 5,
    backgroundColor: '#d9d6d6',
    
    width: 70,
    height: 40,
    fontSize: 25,
    textAlign: 'center'
  },
  modal_buttons_container:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 50
  },
  texto:{
    color: 'white',
    fontSize: 20
  },
  button_ok:{
    backgroundColor: VERDE_OK
  },
  button_cancel:{
    backgroundColor: VERMELHO_CANCEL
  }

});