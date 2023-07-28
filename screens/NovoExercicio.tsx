import { StyleSheet, Text, TouchableOpacity, View, Modal, Alert, Button, TextInput, TextInputFocusEventData, NativeSyntheticEvent, BackHandler } from 'react-native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import React, { useEffect, useRef, useState } from 'react'
import {VERDE_CLARO, CINZA_ESCURO, CINZA_CLARO, CINZA_MODAL, VERMELHO_CANCEL, VERDE_OK} from '../styles/colors';
import AppHeader from '../components/AppHeader';
import CustomButton from '../components/CustomButton';
import CampoMusculo from '../components/CampoMusculo';
import SelecionaMusculoModal from '../components/SelecionaMusculoModal';
import { Exercicio, Treino, setIndexInExercicios } from '../models/models';
import { adicionarExercicio, editarTreino, exercicioIndexMinus, exercicioIndexPlus, resetExercicio, resetTreino} from '../store/storeConfig';
import { useDispatch } from 'react-redux'
import * as db from '../database/database';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Icon from 'react-native-vector-icons/FontAwesome'
import ClickableIcon from '../components/ClicklabIecon';



export default function NovoExercicio() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch()

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

  useEffect(() => {
    
    if(exercicio){
      setNome(exercicio.nome)
      setMusculo(exercicio.musculo)
      setSets(exercicio.sets.toString())
      setReps(exercicio.reps.toString())
      setCarga(exercicio.carga.toString())
    }

  }, [])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove();
    };
  }, []);
  
  const handleEditarExercicio = async () => { 
    const exercicioAtualizado = {
      nome: nome,
      musculo: musculo,
      sets: parseInt(sets),
      reps: parseInt(reps),
      carga: parseInt(carga),
      key: exercicio!.key,
      status: exercicio!.status,
      index: exercicio!.index
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
        
    {/*  USADO PARA TESTES
    let exercicio:Exercicio
    if(!nome && !musculo && !sets && !reps && !carga){
      exercicio = new Exercicio ('Supino','Peito','3','10','50')
    }else{
      exercicio = new Exercicio(nome, musculo, sets, reps, carga) 
    }
    */}
    
    let exercicio : Exercicio = new Exercicio(nome, musculo, sets, reps, carga)
    exercicio.index = treino.exercicios.length
    const novoExerciciosArr: Exercicio[]  = [...treino.exercicios]
    novoExerciciosArr.push(exercicio)
    const treinoAtualizado = {...treino, exercicios: novoExerciciosArr}
    await db.salvarTreino(treinoAtualizado)
    dispatch(adicionarExercicio({...exercicio}))

    navigation.goBack()
  }

  const handleAumentarNumero = (state: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
    let stateParsed = parseInt(state)
    stateParsed ++
    setState(stateParsed.toString())
  }

  const handleDiminuirNumero = (state: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
    let stateParsed = parseInt(state)
    stateParsed --
    setState(stateParsed.toString())
  }

  const handleCancelar = () => { 
    dispatch(resetExercicio())
    navigation.goBack()
  }

  const handleDeletarExercicio = async () => { 
    const novoExerciciosArr =  treino.exercicios.filter(exer => exer.key !== exercicio?.key)
    const treinoAtualizado = {...treino, exercicios: novoExerciciosArr}
    await db.salvarTreino(treinoAtualizado)
    dispatch(editarTreino({...treinoAtualizado}))
    dispatch(resetExercicio())
    navigation.goBack()
  }

  const deleteExercicioAlert = () => { 
    Alert.alert(
      'Deletar Treino',
      'Você quer deletar o treino "' + exercicio?.nome + ' " ?',
      [
        {
          text: 'SIM',
          onPress: () => handleDeletarExercicio()
        },
        {text: 'NÃO', style: 'cancel'}
      ]
    )
  }

  const handleBackButton = () => { 
    dispatch(resetExercicio())
    navigation.goBack()
    return true
  }

  return(
    <View style={styles.container}>
      <AppHeader />
      <Text style={styles.titulo}>{exercicio? 'Editar Exercício' : 'Novo Exercício'}</Text>
      <View style={styles.form_container}>
      
      <TextInput
          style={styles.nome_field} 
          placeholder='Nome'
          value={nome}
          multiline={true}
          onChangeText={(text)=>{ setNome(text)} }
        />
        <CampoMusculo  modalVisible={modalVisible} setModalVisible={setModalVisible} musculo={musculo} setMusculo={setMusculo}/>
        {modalVisible &&
          <SelecionaMusculoModal modalVisible={modalVisible} setModalVisible={setModalVisible} musculo={musculo} setMusculo={setMusculo} />
        }

        <View style={styles.numeros_fields_container}>
          <View style={styles.sets_container}>
            <Text style={styles.texto}>SETS</Text>
            <View style={styles.inputs_container}>
              <TouchableOpacity onPress={()=>handleDiminuirNumero(sets, setSets)}>
                <Icon name='minus' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
              <TextInput
                style={styles.numero_field} 
                keyboardType='numeric'
                placeholder='3'
                value={sets}
                onChangeText={ text => {setSets(text)}}
                onSubmitEditing={()=>setsRef.current?.focus()}
              />
              <TouchableOpacity onPress={()=>handleAumentarNumero(sets, setSets)}>
                <Icon name='plus' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sets_container}>
            <Text style={styles.texto}>REPS</Text>
            <View style={styles.inputs_container}>
              <TouchableOpacity onPress={()=>handleDiminuirNumero(reps, setReps)}>
                <Icon name='minus' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
              <TextInput
                style={styles.numero_field} 
                keyboardType='numeric'
                placeholder='12'
                ref={repsRef}
                value={reps}
                onChangeText={text => setReps(text)}
                onSubmitEditing={()=>cargaRef.current?.focus()}   
              />
              <TouchableOpacity onPress={()=>handleAumentarNumero(reps, setReps)}>
                <Icon name='plus' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sets_container}>
            <Text style={styles.texto}>CARGA</Text>
            <View style={styles.inputs_container}>
              <TouchableOpacity onPress={()=>handleDiminuirNumero(carga, setCarga)}>
                <Icon name='minus' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
              <TextInput
                style={styles.numero_field} 
                keyboardType='numeric'
                placeholder='50'
                ref={cargaRef}
                value={carga}
                onChangeText={ text => setCarga(text)}
              />
              <TouchableOpacity onPress={()=>handleAumentarNumero(carga, setCarga)}>
                <Icon name='plus' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.modal_buttons_container}>
          {!nome || !musculo || !sets || !reps || !carga ?
          <CustomButton style={styles.button_off} title='Salvar' />
            :
          <CustomButton style={styles.button_ok} title='Salvar' onPress={ exercicio? handleEditarExercicio : handleNovoExercicio}/>
          }
          
          <CustomButton style={styles.button_cancel} title='Cancelar' onPress={handleCancelar}/>
        </View>
        {exercicio&&
          <CustomButton style={styles.button_delete} title='DELETAR' onPress={deleteExercicioAlert}/>
          }
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
    paddingTop: 10
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
    fontSize: 25,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  numeros_fields_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },
  sets_container: {
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numero_field:{
    margin: 5,
    marginLeft: 10, 
    marginRight: 10,
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
    fontSize: 15
  },
  inputs_container:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  button_off:{
    backgroundColor: CINZA_CLARO,
    width: 100,
  },
  button_ok:{
    backgroundColor: VERDE_OK,
    width: 100
  },
  button_cancel:{
    backgroundColor: VERMELHO_CANCEL,
    width: 100
  },
  button_delete:{
    alignSelf: 'center',
    marginTop: 40,
    width: 200,
    backgroundColor: VERMELHO_CANCEL
  }

});