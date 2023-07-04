import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BRANCO } from '../styles/colors'
import { Exercicio, Treino } from '../models/models'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import StatusMenu from './StatusMenu';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { resetExercicio, setExercicioAtual } from '../store/storeConfig';



interface Props {
  exercicio: Exercicio,
}

export default function Exercicios({exercicio}: Props) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const exercicioAtual =  useAppSelector((state) => state.exercicio.atual )
  const [statusMenu, setStatusMenu] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetExercicio())
  }, [])
  

  const handleEmojiPress = () => {
    setStatusMenu(true)
  }

  const handleCliqueExercicio = () => { 
    dispatch(setExercicioAtual(exercicio))
    navigation.navigate('NovoExercicio') 
  }

  return (
    <TouchableOpacity style={styles.fileira_exercicio} key={exercicio.key}
      onPress={() => handleCliqueExercicio()}  >
      <Text style={styles.nome}>{exercicio.nome}</Text>
      <View style={styles.descriçao}>
        <Text style={styles.texto}>{exercicio.sets} x {exercicio.reps} / {exercicio.carga} kg</Text>
        <TouchableOpacity style={styles.status_touchable} onPress={() => handleEmojiPress()}>
          <Text style={styles.emoji}>{exercicio.status}</Text>
        </TouchableOpacity>
        {statusMenu&& 
          <StatusMenu statusMenu={statusMenu} setStatusMenu={setStatusMenu} exercicio={exercicio}/>
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    fileira_exercicio:{
      flexDirection: 'row', 
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      borderWidth: 0.5,
      borderColor: BRANCO
    },
    nome:{
        color: 'white',
        alignSelf: 'center',
        fontSize: 25,
        paddingLeft: 10
    },
    descriçao:{
      flex: 1, // Take up remaining horizontal space
      flexDirection: 'row',
      justifyContent: 'flex-end', // Align content to the right,
    },
    texto:{
      color: 'white',
        alignSelf: 'center',
        fontSize: 18,
        paddingLeft: 10,
        marginRight:5
    },
    status_touchable:{    
      borderWidth: 0.5,
      borderColor: BRANCO
    },
    emoji:{   
      padding: 10,
      fontSize: 25
    }
})