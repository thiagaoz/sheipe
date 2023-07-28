import { StyleSheet, TextInput, View, Modal, Alert,  FlatList, Text, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import {VERDE_CLARO, CINZA_ESCURO, CINZA_CLARO, CINZA_MODAL, VERMELHO_CANCEL, VERDE_OK} from '../styles/colors';
import React, { useEffect, useRef, useState } from 'react'
import { GRUPOS_MUSCULARES } from '../models/models';

interface Props{
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setMusculo: React.Dispatch<React.SetStateAction<string>>,
  setHasAlteration: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NovoTreino({modalVisible, setModalVisible,setMusculo, setHasAlteration}: Props) {

    interface ItemProps {
        item: string;
      }

    const handleSeleciona = (text:string) => {
      setMusculo(text)
      setHasAlteration(true)
      setModalVisible(!modalVisible)
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
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <FlatList
            data={GRUPOS_MUSCULARES}
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
      marginTop: 200,
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
      margin: 8,
      marginLeft: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: '40%', // Adjust the width of each item as needed
    },
    itemText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
  });