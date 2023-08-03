import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { CINZA_CLARO, CINZA_ESCURO, VERDE_CLARO } from '../styles/colors'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import the RootStackParamList type
import Icon from 'react-native-vector-icons/FontAwesome'

export default function AppHeader() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_title}>Sheipe</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('InfoScreen')} style={styles.info_icon}>
          <Icon name='info' color={
            //CINZA_CLARO
            CINZA_ESCURO
            } size={30} />
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
//        borderColor: VERDE_CLARO,
  //      borderWidth: 0.5,
        width: '100%',
        paddingBottom: 10
    },
    header_title: {
        color: VERDE_CLARO,
        fontSize: 25,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    info_icon: {
      alignSelf: 'center',
      fontSize: 25,
      marginRight: 10,
      backgroundColor: VERDE_CLARO,
      paddingLeft: 12,
      paddingRight: 12,
      borderRadius: 5,
    }
})