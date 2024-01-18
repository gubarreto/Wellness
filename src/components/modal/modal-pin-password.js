import React, {useState, useEffect, useRef} from 'react';
import {Modal, SafeAreaView, View, TouchableOpacity, Text, StyleSheet, Dimensions, Animated, Easing, TextInput} from 'react-native';
import {getColor, getTranslation} from '../../services';
import {useGlobal} from '../../hooks';

export const ModalPinPassword = ({modalVisible, setModalVisible, accessGranted, autoFocus}) => {
  const {globalProps, setGlobalProps} = useGlobal();
  const [pin, setPin] = useState("");
  const refPinInput = useRef(null);
  const createContentAnimationValue = useRef(new Animated.Value(0)).current;
  const invalidPinAnimationValue = useRef(new Animated.Value(0)).current;
  const s = styles();

  const invalidPinAnimation = Animated.sequence([
    Animated.timing(invalidPinAnimationValue, { toValue: 10, duration: 80, easing: Easing.linear, useNativeDriver: true }),
    Animated.timing(invalidPinAnimationValue, { toValue: -10, duration: 80, easing: Easing.linear, useNativeDriver: true }),
    Animated.timing(invalidPinAnimationValue, { toValue: 10, duration: 80, easing: Easing.linear, useNativeDriver: true }),
    Animated.timing(invalidPinAnimationValue, { toValue: 0, duration: 80, easing: Easing.linear, useNativeDriver: true }),
  ]);

  const onChange = (txt) => {
    setPin(txt);
    if (txt.length == 6 && txt == globalProps.pinPassword) {
      accessGranted();
      closeModal();
    } else if (txt.length == 6) {
      setPin("")
      Animated.loop(invalidPinAnimation).start();
      setTimeout(() => {
        Animated.loop(invalidPinAnimation).stop();
      }, 500);
    };
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const focusPinInput = () => {
    if (refPinInput.current) {
      refPinInput.current.focus();
    };
  };

  const AnimatedPositionCreateContent = () =>
    createContentAnimationValue.interpolate({
      inputRange: [0, 100],
      outputRange: [200, 0],
      extrapolate: "clamp",
  });

  const AnimatedCreateContext = () => {
    Animated.timing(createContentAnimationValue, {
      toValue: 200,
      duration: 600,
      useNativeDriver: false,
      // easing: Easing.out(Easing.exp)
    }).start();
  };

  useEffect(() => {
    AnimatedCreateContext();
  }, []);

  return (
    <Modal animationType="fade" visible={modalVisible} onRequestClose={closeModal.bind(this)} transparent>

      <SafeAreaView style={s.container}>

        <TouchableOpacity activeOpacity={1} style={s.modalOverlay} onPress={closeModal.bind()} disabled={false}>

          <TextInput
            ref={refPinInput}
            selectTextOnFocus={false}
            style={{display: "flex", backgroundColor: "transparent", color: "transparent", zIndex: -1}}
            onChangeText={txt => onChange(txt)}
            value={pin}
            caretHidden
            maxLength={6}
            secureTextEntry
            contextMenuHidden
            selectable={false}
            pointerEvents="none"
            autoFocus={!!autoFocus}
            keyboardType={"numeric"}
          />

          <Animated.View style={[s.contentAnimated, {transform: [{ translateY: AnimatedPositionCreateContent() }]}]} >
            <TouchableOpacity onPress={focusPinInput.bind(this)} style={s.content} activeOpacity={1}>
              <Text style={s.title}>Digite seu PIN</Text>
              <Animated.View style={[s.containerOTP, { transform: [{ translateX: invalidPinAnimationValue }] }]}>
            
                {Array.from({ length: 6 }).map((_, index) => (
                  <View key={index} style={index+1 <= pin.length ? s.filledBall : s.emptyBall}/>
                ))}
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        
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
    contentAnimated: {
      zIndex: 2,
      height: 200,
      width: width,
      position: "absolute",
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      backgroundColor: "white",
    },
    content: {
      flex: 1,
      zIndex: 3,
      padding: 20,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      // backgroundColor: "green",
    },
    title: {
      fontSize: 18,
      marginBottom: 30,
      fontWeight: "700",
      textAlign: "center",
      color: getColor("font-color"),
    },


    containerOTP: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    filledBall: {
      width: 24,
      height: 24,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: '#323232',
      backgroundColor: '#323232',
    },
    emptyBall: {
      width: 24,
      height: 24,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: '#323232',
    },
  });
};