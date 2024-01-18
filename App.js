import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Routes} from "./src/routes";
import {GlobalContextProvider} from './src/hooks/useGlobal';

const App = () => {

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <GlobalContextProvider>
          <Routes/>
        </GlobalContextProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
