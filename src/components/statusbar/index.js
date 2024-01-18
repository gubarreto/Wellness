import React from 'react';
import {StatusBar} from 'react-native';
import {getColor} from '../../services';

export const Statusbar = () => {

  return (
    <StatusBar barStyle={'dark-content'} backgroundColor={getColor("primary-light")} />
  )
};