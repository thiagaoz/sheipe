import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { CINZA_ESCURO } from '../styles/colors'

interface Props{
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    musculo: string,
    setMusculo: React.Dispatch<React.SetStateAction<string>>
  }

export default function CampoMusculo({modalVisible, setModalVisible, musculo, setMusculo}: Props) {


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=> {setModalVisible(!modalVisible)}}> 
        <Text style={styles.texto}>
            {musculo==='' ? 'Selecionar músculo' : musculo}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: CINZA_ESCURO,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5
    },
    button:{
        backgroundColor: '#474B48',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto:{
        alignSelf: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    }
})