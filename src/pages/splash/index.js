import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Button, TextInput, SafeAreaView, ActivityIndicator, Image} from 'react-native';
import {useGlobal} from '../../hooks/useGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";
import {getColor} from '../../services';

import logoName from "../../assets/images/logoName.png";

export const SplashScreen = () => {
  const {globalProps, setGlobalProps} = useGlobal();
  const s = styles();

  useEffect(() => {
    setTimeout(async() => {
      const storagePinPasswordStringify = await AsyncStorage.getItem("@pin-password");
      const storagePinPassword = await JSON.parse(storagePinPasswordStringify);
      if (!!storagePinPassword) await setGlobalProps("setPinPassword", storagePinPassword);
      if (!!storagePinPassword) await setGlobalProps("setEnteredPinPassword", true);
      await setGlobalProps("setIsAppLoading", false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={s.container}>
      <Image source={logoName} style={s.logo} />
      <ActivityIndicator size="large" color={getColor("primary")} />
    </SafeAreaView>
  )
};