import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import TreinoRow from './TreinoRow'
import { Treino } from '../models/models';
import * as db from '../database/database'
import { TreinosState, store } from '../store/storeConfig';
import { useAppSelector } from '../store/hooks';


export default function Treinos() {
  
  const treinos:Treino[] = useAppSelector( (state) => state.treino.treinosArr);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Treinos</Text>
      {treinos.length!==0&&
        treinos.map( treino => (
          <TreinoRow treino={treino} key={treino.key} />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        
    },
    titulo:{
        color: 'white',
        alignSelf: 'center',
        fontSize: 25
    }
})