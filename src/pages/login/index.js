import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, TouchableOpacity, Text, Button, TextInput, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";
import {useGlobal} from '../../hooks/useGlobal';
import {Input, ModalPinPassword, ModalLoading} from '../../components';

import logoName from "../../assets/images/logoName.png";
import Eye from "../../assets/images/eye.svg";
import EyeSlash from "../../assets/images/eye-slash.svg";

export const LoginScreen = () => {
  const {globalProps, setGlobalProps, showToast} = useGlobal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [storageData, setStorageData] = useState(null);
  const [modalLoadingSignIn, setModalLoadingSignIn] = useState(false);
  const navigation = useNavigation();
  const s = styles();

  const SignIn = () => {
    if (storageData) {
      setModalLoadingSignIn(true);
      if (email != storageData.email) {
        showToast({title: "Aviso", description: "Email inválido", background: "#E0B54A"});
        setModalLoadingSignIn(false);
      } else if (password != storageData.password) {
        showToast({title: "Aviso", description: "Senha inválida", background: "#E0B54A"});
        setModalLoadingSignIn(false);
      } else {
        setTimeout(async() => {
          const storageNameStringify = await AsyncStorage.getItem("@name");
          const storageName = await JSON.parse(storageNameStringify);
          if (!!storageName) await setGlobalProps("setName", storageName);
          await setGlobalProps("setEmail", email);
          await setGlobalProps("setPassword", password);
          await setGlobalProps("setSigned", true);
          setModalLoadingSignIn(false);
        }, 2000);
      };
    } else {
      setModalLoadingSignIn(true);
      setTimeout(async() => {
        await setGlobalProps("setEmail", email);
        await setGlobalProps("setPassword", password);
        await setGlobalProps("setSigned", true);
        setModalLoadingSignIn(false);
      }, 2000);
    };
  };
  useEffect(() => {
    const _getData = async() => {
      const keys = ["@email", "@password"];
      const storage_data = await AsyncStorage.multiGet(keys, () => {});
      const storage_email = await JSON.parse(storage_data[0][1]);
      const storage_password = await JSON.parse(storage_data[1][1]);
      if (storage_email && storage_password) setStorageData({email: storage_email, password: storage_password});
    };
    _getData();
  }, []);

  return (
    <SafeAreaView style={s.safeareaview}>
      <View style={s.container}>
        <Image source={logoName} style={s.logo} />

        <Input type="text" prop={{
          title: "Email",
          value: email,
          keyboard: "email-address",
          setValue: setEmail,
          placeholder: "Digite seu email",
          placeholderFontColor: "#585858",
          fontColor: "white",
          largeTextArea: false,
          titleFontColor: "#FFF",
          }}
        />
        <Input type="text" prop={{
          title: "Senha",
          value: password,
          keyboard: 'default',
          setValue: setPassword,
          placeholder: "Digite sua senha",
          placeholderFontColor: "#585858",
          fontColor: "white",
          largeTextArea: false,
          isPassword: showPassword,
          onPressIcon: setShowPassword.bind(this, !showPassword),
          endIcon: showPassword ? Eye : EyeSlash,
          iconColor: "white",
          titleFontColor: "#FFF",
          }}
        />

        <TouchableOpacity style={s.buttonSignIn} onPress={SignIn.bind(this)}>
          <Text style={s.textButtonSignIn}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Text style={s.title}>Esqueceu sua senha ?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("create-account")}>
          <Text style={s.title}>Criar conta</Text>
        </TouchableOpacity>
        
        <ModalLoading modalVisible={modalLoadingSignIn} setModalVisible={setModalLoadingSignIn} />

      </View>
    </SafeAreaView>
  )
};