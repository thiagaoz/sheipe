import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

interface CustomIconProps {
    onPress?: () => void;
    name: string;
    color?: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
  }

const ClickableIcon = ({ onPress, name, color, size, style }: CustomIconProps) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
        <Icon name={name} color={color} size={size}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

});

export default ClickableIcon ;
