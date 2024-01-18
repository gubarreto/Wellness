import React from 'react';
import {View, Text, TextInput, Switch} from 'react-native';

import {styles} from './styles';
import {getColor} from '../../../../services';
import {useGlobal} from '../../../../hooks/useGlobal';

export const InputSwitch = ({prop}) => {
  const {globalProps} = useGlobal();
  const s = styles();

  return (
    <View style={s.container}>
      <Text style={s.title} numberOfLines={2}>{prop.title}</Text>
      <Switch
        value={prop.value}
        ios_backgroundColor={getColor("gray")}
        onValueChange={() => prop.setValue(prev => !prev)}
        trackColor={{false: getColor("gray"), true: getColor("green")}}
      />
    </View>
  );
};