import React, {useState, useEffect, useRef} from "react";
import {View, TouchableOpacity, Text, Stylesheet, Animated, Easing} from "react-native";

import styles from "./styles";
import {useGlobal} from "../../hooks";
import {getColor} from "../../services";

import BellIcon from "../../assets/images/bell.svg";

export const Toast = ({visible = false, setVisible, Icon = BellIcon, title, description, onPress, duration, background, fontColor}) => {

  const s = styles();
  const {globalProps, setGlobalProps, toastProps, showToast} = useGlobal();

  const closingToast = () => {
    setVisible(null);
  };

  const timeout = setTimeout(() => {
    closingToast();
  }, duration || 3000);

  useEffect(() => {
    clearTimeout(timeout);
    const timeout = setTimeout(() => {
      closingToast();
    }, duration || 3000);
  }, [toastProps]);

  return (
    <TouchableOpacity onPress={() => {onPress ? onPress() : closingToast()}} style={[s.container, background && {backgroundColor: background}]}>
      <Icon width={24} height={24} color={fontColor || getColor("font-color")} />
      <View style={{flex: 1, marginLeft: 20}}>
        {title && <Text style={[s.title, fontColor && {color: fontColor}]} numberOfLines={1}>{title}</Text>}
        {description && <Text style={[s.description, fontColor && {color: fontColor}]} numberOfLines={2}>{description}</Text>}
      </View>
    </TouchableOpacity>
  )
};