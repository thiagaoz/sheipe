import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { CINZA_ESCURO, VERDE_CLARO } from '../styles/colors'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type

export default function AppHeader() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_title}>Sheipe</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('InfoScreen')}>
          <Text style={styles.info_icon}>ℹ️</Text>
        </ TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CINZA_ESCURO,
    },
    header:{
        marginTop: 30,
        alignSelf: 'flex-start',
        justifyContent:'space-between',
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth:1,
        width: '100%'
    },
    header_title: {
        color: VERDE_CLARO,
        fontSize: 25,
        marginLeft: 10
    },
    info_icon: {
      alignSelf: 'center',
      fontSize: 25,
      marginRight: 5
    }
})