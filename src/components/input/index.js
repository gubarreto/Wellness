import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {getTranslation} from '../../services';

import styles from './styles';

import {
  InputText,
  InputMask,
  InputDate,
  InputSelect,
  InputSwitch,
} from './commons';

export const Input = ({type, prop}) => {
  const s = styles();

  return (
    <>
      {type == 'text' &&
        <InputText prop={prop} />
      }
      {type == 'password' &&
        <InputText prop={{...prop, isPassword: true}} />
      }
      {type == 'mask' &&
        <InputMask prop={prop} />
      }
      {type == 'date' &&
        <InputDate prop={prop} />
      }
      {type == 'select' &&
        <InputSelect prop={prop} />
      }
      {type == 'switch' &&
        <InputSwitch prop={prop} />
      }
    </>
  );
};