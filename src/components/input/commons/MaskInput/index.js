import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaskInput from 'react-native-mask-input';

import {styles} from './styles';
import {getColor} from '../../../../services';
import {useGlobal} from '../../../../hooks/useGlobal';

export const InputMask = ({prop}) => {
  const {globalProps} = useGlobal();
  const s = styles();

  const Icon = ({type}) => {
    const IconProp = type == 'start' ? prop.startIcon : prop.endIcon;
    if (!IconProp) {
      return <></>;
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!prop.onPressIcon}
          onPress={prop.onPressIcon || {}}
        >
          <IconProp
            color={getColor('font-color')}
            style={type == 'start' ? {marginRight: 5} : {marginLeft: 5}}
            width={24} height={24}
          />
        </TouchableOpacity>
      );
    };
  };

  return (
    <View style={s.container}>
      {prop.title &&
        <Text style={s.title}>{prop.title} {prop.required && '*'}</Text>
      }
      <View style={s.box}>
        <Icon type={'start'} />
        <MaskInput
          style={s.textInput}
          value={prop.value}
          keyboardType={prop.keyboard || 'default'}
          onChangeText={(masked, unmasked) => {
            if (prop.setValueMasked){
              prop.setValueMasked(masked);
            };
            prop.setValueUnmasked(unmasked);
          }}
          maxLength={40}
          mask={prop.mask}
          placeholder={prop.placeholder || null}
          placeholderTextColor={getColor('font-color')}
        />
        <Icon type={'end'} />
      </View>
    </View>
  );
};
