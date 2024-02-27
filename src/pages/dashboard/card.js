import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions, useColorScheme} from 'react-native';
import {useGlobal} from '../hooks/useGlobal';

import {} from '../../components';
import {getColor} from "../../services";

import cardIconDefault from '../../assets/images/plus.svg';

export const Card = ({name, icon}) => {
  const isDarkMode = useColorScheme() === "light";
  const s = styles();
  const Icon = icon || cardIconDefault;
  return (
    <View style={s.cardContainer}>
      <Icon width={24} height={24} color={"blue"} />
      <Text style={s.cardName}>{name}</Text>
    </View>
  )
};

const {width, height} = Dimensions.get("window");
const styles = () => {
  return StyleSheet.create({
    cardContainer: {
      marginTop: 20,
      height: 80,
      elevation: 20,
      borderRadius: 6,
      paddingHorizontal: 15,
      width: width*0.4, //40% screen
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: getColor('background'),
    },
    cardName: {
      fontSize: 16,
      color: getColor('font-color'),
    },
  });
};