import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Button, StyleSheet, Dimensions, FlatList} from 'react-native';
import {useGlobal} from '../../../hooks/useGlobal';

import {} from '../../../components';
import {getColor} from "../../../services";

import cardIconDefault from '../../../assets/images/plus.svg';

const {width, height} = Dimensions.get('window');

export const ListCards = ({data}) => {
  const {globalProps, setGlobalProps} = useGlobal();
  const s = styles();
  console.log(data);

  return (
    <View style={s.container}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index}
        renderItem={({item, index}) => <Card {...item} index={index} />}
        style={s.flatlist}
        horizontal
      />
    </View>
  )
};

const Card = ({name, icon, index}) => {
  const s = styles();
  const Icon = icon || cardIconDefault;
  return (
    <View style={s.cardContainer}>
      <Icon width={24} height={24} color={getColor('font-color')} />
      <Text style={s.cardName}>{name}</Text>
    </View>
  )
};

const styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('background'),
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    flatlist: {
      flex: 1,
    },
    touchable: {},
    text: {
      color: getColor('font-color'),
    },

    cardContainer: {
      marginTop: 20,
      height: 80,
      elevation: 20,
      borderRadius: 6,
      paddingHorizontal: 15,
      minWidth: 80,
      maxWidth: (width - 60) / 2, //(2 x 20 do padding) + 5 (espaçamento central entre 2 cards)
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: getColor('background'),
    },
    cardName: {
      fontSize: 16,
      color: getColor('font-color'),
    },

    cardMarginLeft: {
      marginLeft: 10,
    },
    cardMarginRight: {
      marginRight: 10,
    }

   });
};
export default styles;