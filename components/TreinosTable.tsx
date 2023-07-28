import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TreinoRow from './TreinoRow'
import { Treino, setIndexInTreinos } from '../models/models';
import * as db from '../database/database'
import { TreinosState, carregaTreinos, setTreinoAtual, store } from '../store/storeConfig';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { CINZA_CLARO, CINZA_ESCURO, VERDE_CLARO, VERDE_OK } from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../App'

export default function Treinos() {

  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const treinos:Treino[] = useAppSelector( (state) => state.treino.treinosArr);

  const treinoUp = (treino:Treino) => {
    console.log('UP')
    const treinosNew = [...treinos]
    treinosNew[treino.index - 1] = treinos[treino.index]
    treinosNew[treino.index] = treinos[treino.index - 1]
    const treinosIndexed = setIndexInTreinos(treinosNew)
    dispatch(carregaTreinos([...treinosIndexed]))
    treinosIndexed.forEach( treino => {
      console.log(treino.nome +'['+ treino.index +']')
    })
  }

  const treinoDown = (treino:Treino) => {
    console.log('DOWN')
    const treinosNew = [...treinos]
    treinosNew[treino.index + 1] = treinos[treino.index]
    treinosNew[treino.index] = treinos[treino.index + 1]
    const treinosIndexed = setIndexInTreinos(treinosNew)
    dispatch(carregaTreinos([...treinosIndexed]))
    treinosIndexed.forEach( treino => {
      console.log(treino.nome +'['+ treino.index +']')
    })
  }

  const handleCliqueTreino = (treino:Treino) => { 
    dispatch(setTreinoAtual(treino))
    navigation.navigate('TreinoDisplayScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.titulo_container}>
        <Text style={styles.titulo}>Treinos</Text>
        
      </View>

      {treinos.length!==0&&
        treinos.map( treino => (
          <View style={styles.treino_row_container} key={treino.key}>
            {treino.index!==0 ?
              <TouchableOpacity onPress={()=>treinoUp(treino)}>
                <Icon name='arrow-up' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <Icon name='arrow-up' size={30} color={CINZA_ESCURO} />
              </TouchableOpacity>
            }

            <TouchableOpacity style={styles.treinos_row} onPress={()=> handleCliqueTreino(treino)}>
              <Text style={styles.treino_row_text}>{treino.nome}</Text>
            </TouchableOpacity>

            {treino.index < treinos.length-1 ?
              <TouchableOpacity onPress={()=>treinoDown(treino)}>
                <Icon name='arrow-down' size={30} color={VERDE_CLARO} />
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <Icon name='arrow-down' size={30} color={CINZA_ESCURO} />
              </TouchableOpacity>
            }
          </View>
        ))
      }
  

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      marginTop: 10
    },
    titulo_container:{
      flexDirection: 'row',
      justifyContent: 'center'
    },
    titulo:{
        color: 'white',
        alignSelf: 'center',
        fontSize: 28,
        marginBottom: 15,
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
      width: '70%'
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
    }
})