import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, TouchableOpacity, Text, Button, TextInput, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";
import {useGlobal} from '../../hooks/useGlobal';
import {Input, ModalPinPassword, ModalLoading} from '../../components';

import logoName from "../../assets/images/logoName.png";

export const SignInScreen = () => {
  const {globalProps, setGlobalProps} = useGlobal();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoadingSignIn, setModalLoadingSignIn] = useState(false);
  const navigation = useNavigation();
  const s = styles();

  const SignIn = () => {
    setModalLoadingSignIn(true);
    setTimeout(async() => {
      const keys = ["@name", "@email", "@password"];
      const storage_data = await AsyncStorage.multiGet(keys, () => {});
      const storage_name = await JSON.parse(storage_data[0][1]);
      const storage_email = await JSON.parse(storage_data[1][1]);
      const storage_password = await JSON.parse(storage_data[2][1]);
      if (!!storage_name) await setGlobalProps("setName", storage_name);
      if (!!storage_email) await setGlobalProps("setEmail", storage_email);
      if (!!storage_password) await setGlobalProps("setPassword", storage_password);
      await setGlobalProps("setSigned", true);
    }, 2000);
  };

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <SafeAreaView style={s.safeareaview}>
      <View style={s.container}>
        <View />
        <Image source={logoName} style={s.logo} />
        {modalVisible &&
          <ModalPinPassword modalVisible={modalVisible} setModalVisible={setModalVisible} accessGranted={SignIn.bind(this)} />
        }

        <View>
          <TouchableOpacity style={s.button} onPress={setModalVisible.bind(this, true)}
          >
            <Text style={s.textButton}>Usar senha PIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.button, {backgroundColor: "transparent"}]} onPress={() => navigation.navigate("login")}
          >
            <Text style={s.textButton}>Usar outra conta</Text>
          </TouchableOpacity>
        </View>
        
        <ModalLoading modalVisible={modalLoadingSignIn} setModalVisible={setModalLoadingSignIn} />

      </View>
    </SafeAreaView>
  )
};