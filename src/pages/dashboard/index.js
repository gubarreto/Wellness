import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Button, TextInput, ScrollView} from 'react-native';
import {useGlobal} from '../../hooks/useGlobal';

import styles from "./styles";
import {Header, ModalLoading} from '../../components';
import {ListCards} from './commons/listCards';
import {Card} from './card';

import walletIcon from '../../assets/images/wallet.svg';
import financeIcon from '../../assets/images/finance.svg';
import ImageCardDefault from '../../assets/images/logoName.png';

export const DashboardScreen = () => {
  const {globalProps, setGlobalProps} = useGlobal();
  const s = styles();

  const data = [
    {name: "Carteira", icon: walletIcon},
    {name: "Financeiro", icon: financeIcon}
  ];

  return (
    <>
      <Header  />
      <View style={s.container}>

        <ScrollView horizontal scrollEnabled showsHorizontalScrollIndicator={false} style={s.listHorizontal} >
          <Card name={data[0].name} icon={data[0].icon} />
        </ScrollView>

        {/* <ListCards data={data} /> */}
      </View>
    </>
  )
};