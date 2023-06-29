import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import {Exercicio, STATUS} from '../models/models'
import { CINZA_ESCURO } from '../styles/colors'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { editarTreino } from '../store/storeConfig';
import * as db from '../database/database'


interface Props{
  setStatusMenu: React.Dispatch<React.SetStateAction<boolean>>,
  statusMenu: boolean,
  exercicio: Exercicio
}

export default function StatusMenu({setStatusMenu, statusMenu, exercicio}:Props) {
  
  const treino = useAppSelector((state) => state.treino.atual)
  const dispatch = useAppDispatch()

  const editarStatus = async (index:number) => {
    const exercicioAtualizado = {...exercicio, status: STATUS[index]} 
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
    setStatusMenu(!statusMenu)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> editarStatus(1)}>
        <Text style={styles.emoji}>{STATUS[1]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> editarStatus(2)}>
        <Text style={styles.emoji}>{STATUS[2]}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> editarStatus(3)}>
        <Text style={styles.emoji}>{STATUS[3]}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
   position: 'absolute'
  },
  emoji:{   
    padding: 10,
    fontSize: 25,
    backgroundColor: CINZA_ESCURO,
    borderColor: 'white',
    borderWidth: 1
  }
})