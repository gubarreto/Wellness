import React, {useState, useContext, createContext, useEffect, useReducer} from "react";
import {Toast} from "../components";

export const GlobalContext = createContext(null);

const initialProps = {
  name: null,
  email: null,
  password: null,
  pinPassword: null,
  enteredPinPassword: null,
  language: "PT",
  exams: [],
  examsHistoric: [],
  queries: [],
  queriesHistoric: [],
  isAppLoading: true,
  signed: false
};

const reducer = (globalProps, {key, value}) => {
  const objLiterals = {
    "setName": (value) => {return {...globalProps, name: value}},
    "setEmail": (value) => {return {...globalProps, email: value}},
    "setPassword": (value) => {return {...globalProps, password: value}},
    "setPinPassword": (value) => {return {...globalProps, pinPassword: value}},
    "setEnteredPinPassword": (value) => {return {...globalProps, enteredPinPassword: value}},
    "setLanguage": (value) => {return {...globalProps, language: value}},
    "setExams": (value) => {return {...globalProps, exams: value}},
    "setExamsHistoric": (value) => {return {...globalProps, examsHistoric: value}},
    "setQueries": (value) => {return {...globalProps, queries: value}},
    "setQueriesHistoric": (value) => {return {...globalProps, queriesHistoric: value}},
    "setIsAppLoading": (value) => {return {...globalProps, isAppLoading: value}},
    "setSigned": (value) => {return {...globalProps, signed: value}},
    "setAllProps": (value) => {return {...value}},
    "default": () => {return {...globalProps}},
  };
  return objLiterals[key](value);
};

export const GlobalContextProvider = ({ children }) => {

  const [globalProps, dispach] = useReducer(reducer, initialProps);
  const [toastProps, setToastProps] = useState(null);

  const setGlobalProps = (key, value) => {
    dispach({key: key, value: value});
  };

  const showToast = (obj) => {
    if (toastProps) setToastProps(null);
    const objToast = {
      visible: true,
      setVisible: setToastProps,
      Icon: obj?.icon,
      title: obj?.title,
      description: obj?.description,
      onPress: obj?.onPress,
      duration: obj?.duration,
      background: obj?.background,
      fontColor: obj?.fontColor,
    };
    setToastProps(objToast);
  };

  return (
    <GlobalContext.Provider value={{globalProps, setGlobalProps, toastProps, showToast}}>
      {children}
      {toastProps &&
        <Toast
          visible={toastProps?.visible}
          setVisible={toastProps?.setVisible}
          Icon={toastProps?.icon}
          title={toastProps?.title}
          description={toastProps?.description}
          onPress={toastProps?.onPress}
          duration={toastProps?.duration}
          background={toastProps?.background}
          fontColor={toastProps?.fontColor}
        />
      }
    </GlobalContext.Provider>
  )
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  return context;
};