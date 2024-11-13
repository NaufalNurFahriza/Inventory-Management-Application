import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

export const BASE_URL = 'https://mobile.dev.quadrant-si.id/developertest';
export const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMGQ3ZmQ0ZC0yZWNmLTQzM2MtYjJhNS0xOTFjYzM2YzFjZTkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJzdWIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbInNlYy5leHQuYyIsInNlYy5leHQuZCIsInNlYy5leHQudSIsInNlYy5leHQudiIsInNlYy5tb2QuYyIsInNlYy5tb2QuZCIsInNlYy5tb2QudSIsInNlYy5tb2QudiIsInNlYy5wZXIuYyIsInNlYy5wZXIuZCIsInNlYy5wZXIudSIsInNlYy5wZXIudiIsInNlYy5yb2wuYyIsInNlYy5yb2wuZCIsInNlYy5yb2wudSIsInNlYy5yb2wudiIsInNlYy51c2UuYyIsInNlYy51c2UuZCIsInNlYy51c2UudSIsInNlYy51c2UudiJdLCJwZXJtaXNzaW9uIjpbInNlYy5leHQuYyIsInNlYy5leHQuZCIsInNlYy5leHQudSIsInNlYy5leHQudiIsInNlYy5tb2QuYyIsInNlYy5tb2QuZCIsInNlYy5tb2QudSIsInNlYy5tb2QudiIsInNlYy5wZXIuYyIsInNlYy5wZXIuZCIsInNlYy5wZXIudSIsInNlYy5wZXIudiIsInNlYy5yb2wuYyIsInNlYy5yb2wuZCIsInNlYy5yb2wudSIsInNlYy5yb2wudiIsInNlYy51c2UuYyIsInNlYy51c2UuZCIsInNlYy51c2UudSIsInNlYy51c2UudiJdLCJyb2xlIjpbIi0iLCJTdXBlciBBZG1pbiJdLCJleHAiOjE3MzE0NzcyOTQsImlzcyI6Imh0dHBzOi8vbW9iaWxlLmRldi5xdWFkcmFudC1zaS5pZC9hZ2VudGRldi8iLCJhdWQiOiJRTUFHRU5UIn0.n9Kur-Ysl4eEgaZJHA1qeZ_LcVtOTwtDZRhsInZOCxI';

const ModalAddFile = ({ show, onClose }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [contacts, setContacts] = useState([{ name: '', contactType: 'mobilePhone', value: '' }]); // Simplified contacts

  const handleSubmit = async () => {
    const supplierData = {
      id,
      name,
      address,
      postCode,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/Supplier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-version': '1.0',
          'Authorization': `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(supplierData),
      });
  
      if (response.ok) {
        const data = await response.json();
        Alert.alert('Supplier added successfully!');
        console.log('Supplier data:', data); 
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

          <Text style={styles.inputLabel}>ID Kurir</Text>
          <TextInput
            style={styles.input}
            value={id}
            onChangeText={setId}
            placeholder="Masukan ID produk"
            placeholderTextColor="#607D8B"
          />

          <Text style={styles.inputLabel}>Nama Kurir</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Masukan nama kurir"
            placeholderTextColor="#607D8B"
          />

          <Text style={styles.inputLabel}>Kode Posko</Text>
          <TextInput
            style={styles.input}
            value={postCode}
            onChangeText={setPostCode}
            placeholder="Masukan kode posko"
            placeholderTextColor="#607D8B"
          />

          <Text style={styles.inputLabel}>Alamat</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Masukan alamat tinggal kurir"
            placeholderTextColor="#607D8B"
            multiline
          />

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