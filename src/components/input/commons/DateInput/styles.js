import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import {useGlobal} from "../../../../hooks/useGlobal";
import {getColor} from '../../../../services';

const {width, height} = Dimensions.get('window');

export const styles = () => {
  const {globalProps} = useGlobal();

  return (
    StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "transparent",
      },
      title: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        color: getColor('font-color'),
      },
      textInput: {
        height: 40,
        fontSize: 14,
        color: getColor('font-color')
      },
      content: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      },
      box: {
        borderRadius: 10,
        borderColor: getColor('box-border-color'),
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: getColor('box-background'),
        marginBottom: 10,
      },
    })
  )
};