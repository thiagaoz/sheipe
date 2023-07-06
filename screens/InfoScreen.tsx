import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { CINZA_ESCURO } from '../styles/colors'

const InfoScreen = () => {

  const handleLinkPress = () => {
    const url = 'https://example.com'; // Replace with your desired URL
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text>Sheipe</Text>
      <View style={styles.text_container}>
        <Text style={styles.text}>por Thiago Vaz</Text>
        <Text style={styles.text}>github: @thiagaoz</Text>
        <Text style={styles.text}>contato: thiagaoz@proton.me</Text>
        <Text style={styles.text_projeto}>Repositório do projeto:</Text>
        <TouchableOpacity onPress={handleLinkPress}>
          <Text style={styles.text}> 🔗 github.com/thiagaoz/sheipe 🔗</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  )
}

export default InfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CINZA_ESCURO,
  },
  text_container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    margin: 5,
    color: 'white'
  },
  text_projeto:{
    margin: 5,
    color: 'white',
    marginTop: 50
  }


});