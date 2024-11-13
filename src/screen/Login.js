import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const Login = () => {
  const [courierCode, setCourierCode] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!courierCode || !password) {
      Alert.alert('Error', 'Please enter both courier code and password');
      return;
    }


    console.log('Courier Code:', courierCode);
    console.log('Password:', password);


  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masuk</Text>
      <Text style={styles.subtitle}>Sudah punya akun? masuk sekarang</Text>
      
      <Text style={styles.label}>Kode Kurir</Text>
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/011500f14074c9afe3c7f8be000153c41e1832bf82aaf971530f0c16e3d7b113' }}
          style={styles.icon}
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          placeholder="Masukan kode kurir"
          value={courierCode}
          onChangeText={setCourierCode}
          keyboardType="default"
        />
      </View>

      <Text style={styles.label}>Kata Sandi</Text>
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fda3cb701bf363c9a2bf1ba845d1e8ae5f5cfda4075f75ce0a169b745f9cb556' }}
          style={styles.icon}
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          placeholder="Masukan password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          keyboardType="default"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  subtitle: {
    marginTop: 8,
    color: '#6b6b6b',
  },
  label: {
    marginTop: 20,
    color: '#6b6b6b',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: '#e5e5e5',
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#2d2d2d',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;