import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

// Your API configuration
export const BASE_URL = 'https://mobile.dev.quadrant-si.id/developertest';
export const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYjE4ZTc4ZS01NzY2LTQyNWQtOTI4OS03YTM5YTIxYTc1YTgiLCJ...'; // Use the actual token

const ModalAddFile = ({ show, onClose }) => {
  // State to manage the form input values
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [contacts, setContacts] = useState([{ name: '', contactType: 'mobilePhone', value: '' }]); // Simplified contacts

  const handleSubmit = async () => {
    // Create the data object to send to the API
    const supplierData = {
      id,
      name,
      address,
      postCode,
    };
  
    try {
      // Make the API POST request
      const response = await fetch(`${BASE_URL}/Supplier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-version': '1.0',
          'Authorization': `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(supplierData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        Alert.alert('Supplier added successfully!');
        console.log('Supplier data:', data); // For debugging
      } else {
        const errorText = await response.text();
        console.error('Error adding supplier:', response.status, errorText);
        if (response.status === 401) {
          Alert.alert('Unauthorized: Check your token or login credentials.');
        } else {
          Alert.alert('Failed to add supplier:', errorText);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred while adding the supplier.');
    }
  };

  return (
    <Modal transparent visible={show} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.title}>
            <Text style={styles.modalTitle}>Tambah Kurir Baru</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalDescription}>Input data kurir baru</Text>

          {/* ID Kurir */}
          <Text style={styles.inputLabel}>ID Kurir</Text>
          <TextInput
            style={styles.input}
            value={id}
            onChangeText={setId}
            placeholder="Masukan ID produk"
            placeholderTextColor="#607D8B"
          />

          {/* Nama Kurir */}
          <Text style={styles.inputLabel}>Nama Kurir</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Masukan nama kurir"
            placeholderTextColor="#607D8B"
          />

          {/* Kode Posko */}
          <Text style={styles.inputLabel}>Kode Posko</Text>
          <TextInput
            style={styles.input}
            value={postCode}
            onChangeText={setPostCode}
            placeholder="Masukan kode posko"
            placeholderTextColor="#607D8B"
          />

          {/* Alamat */}
          <Text style={styles.inputLabel}>Alamat</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Masukan alamat tinggal kurir"
            placeholderTextColor="#607D8B"
            multiline
          />

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
            <Text style={styles.confirmButtonText}>Konfirmasi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    width: '90%',
    maxWidth: 480,
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1C',
  },
  modalDescription: {
    fontSize: 14,
    color: '#607D8B',
    marginTop: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#1C1C1C',
    marginTop: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    marginTop: 8,
    fontSize: 14,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#D32F2F',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModalAddFile;