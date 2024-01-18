import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import {styles} from './styles';
import {getColor} from '../../../../services';

export const InputText = ({prop}) => {
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
            color={getColor("font-color")}
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
      <View style={prop.styleBox || s.box}>
        <Icon type={'start'} />
        <TextInput
          style={[s.textInput, {height: prop.largeTextArea ? 120 : 40}]}
          onChangeText={txt => prop.setValue(txt)}
          value={prop.value}
          placeholder={prop.placeholder || null}
          keyboardType={prop.keyboard || "default"}
          placeholderTextColor={getColor("font-color")}
          multiline={prop.largeTextArea}
          maxLength={prop.largeTextArea ? 120 : 40}
          secureTextEntry={prop.isPassword}
        />
        <Icon type={'end'} />
      </View>
    </View>
  );
};