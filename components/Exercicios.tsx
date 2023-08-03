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
  const [stringLength, setStringLength] = useState<number>(exercicio.nome.length)
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
        <Text style={ stringLength<16? styles.nome : styles.nomeLong}
          >{exercicio.nome}</Text>
        <View style={styles.descriçao}>
          <View style={styles.musculo_container}>
            <Text style={styles.texto}>{exercicio.musculo}</Text>
          </View>
          <View style={styles.equip_container}>
            <Text style={[styles.texto, styles.equip_texto]}>{exercicio.equip}</Text>  
          </View>
          <View style={styles.sets_reps_container}>
            {exercicio.carga===0?
              <Text style={[styles.texto, styles.lowerCase]}>{exercicio.sets} x {exercicio.reps}</Text>  
            :
              <Text style={[styles.texto, styles.lowerCase]}>{exercicio.sets} x {exercicio.reps}   {exercicio.carga}kg</Text>  
            }
          </View>
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
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    nomeLong:{
      color: 'white',
      textAlign: 'center',
      fontSize: 22,
      paddingLeft: 10,
      fontWeight: 'bold'
    },
    descriçao:{
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    musculo_container:{
      borderColor: 'white',
      //borderWidth: 1,
      minWidth:100
    },
    equip_container:{
      justifyContent: 'center',
      borderColor: 'white',
      //borderWidth: 1,
      minWidth:110
    },
    equip_texto:{
      textAlign: 'center'
    },
    sets_reps_container:{
      borderColor: 'white',
      //borderWidth: 1,
      minWidth:100,
      alignItems: 'center'
    },
    texto:{
      color: 'white',
      fontSize: 16,
      marginRight:5,
      textTransform: 'capitalize'
    },
    lowerCase:{
      textTransform: 'lowercase'
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