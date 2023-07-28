import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BRANCO, CINZA_CLARO } from '../styles/colors'
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

  const handleEmojiPress = () => {
    setStatusMenu(true)
  }

  const handleCliqueExercicio = () => { 
    dispatch(setExercicioAtual(exercicio))
    navigation.navigate('NovoExercicio') 
  }

  return (
    <View style={styles.fileira_exercicio}>
      <TouchableOpacity key={exercicio.key}
        onPress={() => handleCliqueExercicio()}  >
        <Text style={styles.nome}>{exercicio.nome}</Text>
        <View style={styles.descriçao}>
          <Text style={styles.texto}>{exercicio.musculo}</Text>  
          <Text style={styles.texto}></Text>  
          <Text style={styles.texto}>{exercicio.sets} x {exercicio.reps}   {exercicio.carga}kg</Text>  
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    fileira_exercicio:{
      //alignItems: 'stretch',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      padding: 5,
      borderRadius: 8,
      backgroundColor: CINZA_CLARO
    },
    nome:{
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        paddingLeft: 10
    },
    descriçao:{
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    texto:{
      color: 'white',
      fontSize: 16,
      paddingLeft: 10,
      marginRight:5,
      textTransform: 'capitalize'
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