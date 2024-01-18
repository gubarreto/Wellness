import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import styles from './styles';
import {Statusbar} from '../statusbar';
import {useGlobal} from '../../hooks/useGlobal';
import {getColor, getTranslation} from '../../services';

import NotificationIcon from "../../assets/images/bell.svg";

export const Header = ({}) => {
  const s = styles();
  const {globalProps} = useGlobal();

  return (
    <>
      <Statusbar/>
      <View style={s.container}>
        <View style={s.content}>
          <Text style={s.text} numberOfLines={1}>
            {globalProps?.name}
          </Text>
          <TouchableOpacity style={s.buttonNotif} activeOpacity={1}>
            <NotificationIcon
              color={getColor("primary")}
              style={s.icon}
              height={24}
              width={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};