import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, TouchableOpacity, Text, Button, TextInput, Image} from 'react-native';
import {useGlobal} from '../../hooks/useGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";
import {GoBackScreen, Input, RegisterPinPassword, ModalLoading} from '../../components';

import logoName from "../../assets/images/logoName.png";
import Eye from "../../assets/images/eye.svg";
import EyeSlash from "../../assets/images/eye-slash.svg";

export const CreateAccountScreen = () => {
  const {globalProps, setGlobalProps, showToast} = useGlobal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);
  const [modalVisibleRegisterPinPassword, setModalVisibleRegisterPinPassword] = useState(false);
  const s = styles();

  const validForm = async() => {
    
    if (!name) showToast({title: "Aviso", description: "Escreva o nome", background: "#E0B54A"})
    else if (!email) showToast({title: "Aviso", description: "Escreva o email", background: "#E0B54A"})
    else if (!password) showToast({title: "Aviso", description: "Escreva a senha", background: "#E0B54A"})
    else if (!confirmPassword) showToast({title: "Aviso", description: "Escreva a senha novamente", background: "#E0B54A"})
    else if (password != confirmPassword) showToast({title: "Aviso", description: "Senha inválida", background: "#E0B54A"})
    else {
      setModalVisibleRegisterPinPassword(true);
    };
  };

  const createAccount = async() => {
    setModalVisibleLoading(true);
    const form_props = {
      name: name,
      email: email,
      password: password,
      pinPassword: globalProps.pinPassword,
      enteredPinPassword: globalProps.enteredPinPassword,
      language: globalProps.language,
      exams: globalProps.exams,
      examsHistoric: globalProps.examsHistoric,
      queries: globalProps.queries,
      queriesHistoric: globalProps.queriesHistoric,
      isAppLoading: false,
      signed: true
    };
    const StorageItems = [
      ["@name", JSON.stringify(name)],
      ["@email", JSON.stringify(email)],
      ["@password", JSON.stringify(password)],
      // ["@pin-password", JSON.stringify(pinPassword)],
    ];
    await AsyncStorage.multiSet(StorageItems, () => {});
    setTimeout(async() => {
      await setGlobalProps("setAllProps", form_props);
      setModalVisibleLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={s.safeareaview}>
      <View style={s.container}>
        <Image source={logoName} style={s.logo} />
        <GoBackScreen />

        <Input type="text" prop={{
          title: "Nome",
          value: name,
          keyboard: "default",
          required: true,
          setValue: setName,
          placeholder: "Digite seu email",
          placeholderFontColor: "#585858",
          fontColor: "white",
          largeTextArea: false,
          titleFontColor: "#FFF",
          }}
        />
        <Input type="text" prop={{
          title: "Email",
          value: email,
          keyboard: "email-address",
          required: true,
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
          required: true,
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
        <Input type="text" prop={{
          title: "Confirmar Senha",
          value: confirmPassword,
          keyboard: 'default',
          required: true,
          setValue: setConfirmPassword,
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

        <TouchableOpacity style={s.buttonSignIn} onPress={validForm.bind(this)}>
          <Text style={s.textButtonSignIn}>Continuar</Text>
        </TouchableOpacity>

        {modalVisibleRegisterPinPassword &&
          <RegisterPinPassword modalVisible={modalVisibleRegisterPinPassword} setModalVisible={setModalVisibleRegisterPinPassword} execFinally={createAccount.bind(this)} />
        }

        {modalVisibleLoading &&
          <ModalLoading modalVisible={modalVisibleLoading} setModalVisible={setModalVisibleLoading} />
        }

      </View>
    </SafeAreaView>
  )
};