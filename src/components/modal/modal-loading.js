import React, {useState, useEffect, useRef} from 'react';
import {Modal, SafeAreaView, View, TouchableOpacity, Text, StyleSheet, Dimensions, Animated, Easing, TextInput, ActivityIndicator} from 'react-native';
import {getColor} from '../../services';
import {useGlobal} from '../../hooks/useGlobal';

export const ModalLoading = ({modalVisible, setModalVisible, disabled = true}) => {
  const {globalProps, setGlobalProps} = useGlobal();
  const s = styles();

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal animationType="fade" visible={modalVisible} onRequestClose={closeModal.bind(this)} transparent>

      <SafeAreaView style={s.container}>

        <TouchableOpacity activeOpacity={1} style={s.modalOverlay} onPress={closeModal.bind()} disabled={disabled}>

          <View style={s.content}>

            <ActivityIndicator size="large" color={"white"} />

          </View>
        
        </TouchableOpacity>

      </SafeAreaView>

    </Modal>
  )
};

const {width, height} = Dimensions.get("window");

const styles = () => {
  return StyleSheet.create({

    container: {
      flex: 1,
    },

    modalOverlay: {
      flex: 1,
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    
  });
};