import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getTranslation} from '../../../../services';

import {styles} from './styles';
import {ModalItem} from './commons';
import {getColor} from '../../../../services';
import {useGlobal} from '../../../../hooks/useGlobal';

import IconArrow from '../../../../assets/images/arrow.svg';

export const InputSelect = ({prop}) => {
  const {globalProps} = useGlobal();
  const {theme} = globalProps;
  const [modalVisible, setModalVisible] = useState(false);
  const s = styles();

  return (
    <View style={prop.containerStyles || s.container}>
      {prop.title &&
        <Text style={s.title}>{prop.title} {prop.required && '*'}</Text>
      }
      <TouchableOpacity
        style={s.box}
        onPress={setModalVisible.bind(this, true)}>
        <Text style={s.text} numberOfLines={1} >{prop.value || "Selecione"}</Text>
        <View
          style={{
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <IconArrow color={getColor('font-color')} />
        </View>
      </TouchableOpacity>

      {modalVisible && (
        <ModalItem
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          prop={prop}
        />
      )}
    </View>
  );
};
