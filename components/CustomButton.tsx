import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface CustomButtonProps {
    onPress?: () => void;
    title: string;
    style?: StyleProp<ViewStyle>;
  }

const CustomButton = ({ onPress, title, style }: CustomButtonProps) => {
  return (
    <TouchableOpacity  onPress={onPress}>
      <Text style={[styles.button, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  buttonText: {
  },
});

export default CustomButton;
