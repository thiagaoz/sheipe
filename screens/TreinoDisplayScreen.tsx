import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import React, { useEffect, useState } from 'react'
import {VERDE_CLARO, CINZA_ESCURO} from '../styles/colors';
import { Exercicio, Treino } from '../models/models';
import Exercicios from '../components/Exercicios';
import * as db from '../database/database';
import { TreinosState, store } from '../store/storeConfig';
import { useAppSelector } from '../store/hooks';
import NovoTreinoModal from './NovoTreinoModal';
import AppHeader from '../components/AppHeader';

export default function TreinoScreen() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const treino = useAppSelector( (state) => state.treino.atual);
  const exercicios = useAppSelector( (state) => state.treino.atual.exercicios)

  const [modalVisible, setModalVisible] = useState<boolean>(false)


  const renderExercicios = () => {
    return (
      <View>
        {exercicios.map((exercicio) => (
          <Exercicios exercicio={exercicio} key={exercicio.key} />
        ))}
      </View>
    );
  };

{/*
  const consoleLogTreino = async() => {
    console.log('------ EXERCICIOS - STORE ------------')
    exercicios.forEach( exercicio => {
      console.log(`${exercicio.nome}: ${exercicio.sets} x ${exercicio.reps} / ${exercicio.carga}`)
0    })
    console.log('------ EXERCICIOS - DATABASE ------------')
    const treinoDB = await db.getTreino(treino.key)
    if(treinoDB){
      treinoDB.exercicios.forEach( exercicio => {
        console.log(`${exercicio.nome}: ${exercicio.sets} x ${exercicio.reps} / ${exercicio.carga}`)
      })
    }
  }
*/}

  return (
    <View style={styles.container}>
        <AppHeader />

        <View style={styles.treino_container}>
          <Text style={styles.titulo}>{treino.nome}</Text>
          {/* 
          <TouchableOpacity onPress={ ()=>setModalVisible(!modalVisible) } >
            <Text style={styles.emoji_editar}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.emoji_estatisticas}>📊</Text>
          </TouchableOpacity>
        */}
        </View>

        {treino.exercicios.length === 0? 
          <Text style={styles.header_title}> NENHUM EXERCÍCIO ADICIONADO</Text>
          :
          renderExercicios()
        }
        <TouchableOpacity style={styles.mais_exercicio} onPress={() => { navigation.navigate('NovoExercicio') }}>
          <Text >+ Exercício</Text>
        </TouchableOpacity>

        {/* --- BOTÕES DE TESTES
        <TouchableOpacity style={styles.mais_exercicio} onPress={() => consoleLogTreino()}>
          <Text >CONSOLE LOG</Text>
        </TouchableOpacity>
        */}

        {modalVisible &&
          <NovoTreinoModal modalVisible={modalVisible} setModalVisible={setModalVisible} modoEditar={true}/>
        }
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: CINZA_ESCURO,
    },
    header:{
      marginTop: 30,
      alignSelf: 'flex-start',
      borderColor: 'white',
      borderWidth:1,
      width: '100%'
    },
    header_title: {
      color: VERDE_CLARO,
      alignSelf: 'center',
      fontSize: 20,
      marginLeft: 10
    },
    treino_container:{
      justifyContent: 'space-around',
      flexDirection: 'row'
    },
    titulo:{
      color: 'white',
      fontSize: 25,
      margin: 10
    },
    emoji_estatisticas:{
      fontSize: 30,
      margin: 5,
    },
    emoji_editar:{
      fontSize: 25,
      margin: 7,
      padding:3,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      paddingTop: -1,
      paddingBottom: -1,
      paddingRight: -1
    },
    mais_exercicio:{
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
    teste:{
      borderColor: 'white',
      borderWidth: 1
    }
  });