import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, Button, TextInput } from 'react-native';
import { useGlobal } from '../../hooks/useGlobal';

import styles from "./styles";
import {Header} from '../../components';

export const Exams = () => {
  const {globalProps, setGlobalProps} = useGlobal();
  const s = styles();

  return (
    <>
      <Header/>
      <View style={s.container}>
      </View>
    </>
  )
};