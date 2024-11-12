import React from 'react';
import { SafeAreaView } from 'react-native';
import Home from './src/screen/Home';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Home />
    </SafeAreaView>
  );
};

export default App;