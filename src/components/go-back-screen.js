import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getColor} from '../services';

import ArrowIcon from "../assets/images/arrow.svg";

export const GoBackScreen = () => {

  const s = styles();
  const navigation = useNavigation();

  return (
      <TouchableOpacity style={s.container} onPress={() => navigation.goBack()} activeOpacity={0.8}>
        <ArrowIcon style={s.icon} width={32} height={32} color={getColor("white")} />
      </TouchableOpacity>
  )
};

const {width, height} = Dimensions.get('window');

const styles = () => {
  return StyleSheet.create({
    container: {
      top: 20,
      left: 20,
      width: 50,
      height: 50,
      borderRadius: 25,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#242324",
    },
    icon: {
      right: 1.5,
      transform: [{ rotate: '90deg'}],
    },

   });
};