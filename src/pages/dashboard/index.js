import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Button, TextInput} from 'react-native';
import {useGlobal} from '../../hooks/useGlobal';

import styles from "./styles";
import {Header, ModalLoading} from '../../components';
import {ListCards} from './commons/listCards';

import walletIcon from '../../assets/images/wallet.svg';
import financeIcon from '../../assets/images/finance.svg';

export const DashboardScreen = () => {
  const {globalProps, setGlobalProps} = useGlobal();
  const s = styles();

  const data = [
    {name: "Carteira", icon: walletIcon},
    {name: "Financeiro", icon: financeIcon},
    {name: "Financeiro", icon: financeIcon},
    {name: "Financeiro", icon: financeIcon},
  ];

  return (
    <>
      <Header  />
      <View style={s.container}>
        <ListCards data={data} />
      </View>
    </>
  )
};