import { StyleSheet, TextInput, View, Modal, Alert,  FlatList, Text, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import {VERDE_CLARO, CINZA_ESCURO, CINZA_CLARO, CINZA_MODAL, VERMELHO_CANCEL, VERDE_OK} from '../styles/colors';
import React, { useEffect, useRef, useState } from 'react'
import { EQUIPAMENTO } from '../models/models';

interface Props{
  equipModalVisible: boolean,
  setEquipModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setEquip: React.Dispatch<React.SetStateAction<string>>,
  setHasAlteration: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SelecionaEquip({equipModalVisible, setEquipModalVisible,setEquip, setHasAlteration}: Props) {

    interface ItemProps {
        item: string;
      }

    const handleSeleciona = (text:string) => {
      setEquip(text)
      setHasAlteration(true)
      setEquipModalVisible(!equipModalVisible)
    }

    const renderMusculos = ({ item }:ItemProps) => (
        <TouchableOpacity style={styles.item} onPress={()=>handleSeleciona(item)}>
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      );
  return (
    <Modal
        style={styles.container}
        animationType="slide"
        transparent={true}
        visible={equipModalVisible}
        onRequestClose={() => {
          setEquipModalVisible(!equipModalVisible);
        }}>
        <FlatList
            data={EQUIPAMENTO}
            numColumns={2}
            renderItem={renderMusculos}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.content}
        />
      </Modal>
  )
}

const styles = StyleSheet.create({
    container: {

    },
    content: {
      marginTop: 180,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: CINZA_CLARO,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      width: '90%',
      borderColor: 'white',
      borderWidth: 0.5
        
    },
    item: {
      //margin: 8,
      marginLeft: 20,
      marginBottom: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: '42%', // Adjust the width of each item as needed
    },
    itemText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
    },
  });