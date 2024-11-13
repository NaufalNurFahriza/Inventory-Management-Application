import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ModalAddFile from './modal/ModalAddFile.js';
import ModalEditFile from './modal/ModalEditFile.js';

export const BASE_URL = 'https://mobile.dev.quadrant-si.id/developertest/api/docs/';
export const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOTM0MTVlMC1mYjM3LTQyMmEtODEyZC03M2VjN2E4YmQ5MWMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJzdWIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbInNlYy5leHQuYyIsInNlYy5leHQuZCIsInNlYy5leHQudSIsInNlYy5leHQudiIsInNlYy5tb2QuYyIsInNlYy5tb2QuZCIsInNlYy5tb2QudSIsInNlYy5tb2QudiIsInNlYy5wZXIuYyIsInNlYy5wZXIuZCIsInNlYy5wZXIudSIsInNlYy5wZXIudiIsInNlYy5yb2wuYyIsInNlYy5yb2wuZCIsInNlYy5yb2wudSIsInNlYy5yb2wudiIsInNlYy51c2UuYyIsInNlYy51c2UuZCIsInNlYy51c2UudSIsInNlYy51c2UudiJdLCJwZXJtaXNzaW9uIjpbInNlYy5leHQuYyIsInNlYy5leHQuZCIsInNlYy5leHQudSIsInNlYy5leHQudiIsInNlYy5tb2QuYyIsInNlYy5tb2QuZCIsInNlYy5tb2QudSIsInNlYy5tb2QudiIsInNlYy5wZXIuYyIsInNlYy5wZXIuZCIsInNlYy5wZXIudSIsInNlYy5wZXIudiIsInNlYy5yb2wuYyIsInNlYy5yb2wuZCIsInNlYy5yb2wudSIsInNlYy5yb2wudiIsInNlYy51c2UuYyIsInNlYy51c2UuZCIsInNlYy51c2UudSIsInNlYy51c2UudiJdLCJyb2xlIjpbIi0iLCJTdXBlciBBZG1pbiJdLCJleHAiOjE3MzE0NjcxMTYsImlzcyI6Imh0dHBzOi8vbW9iaWxlLmRldi5xdWFkcmFudC1zaS5pZC9hZ2VudGRldi8iLCJhdWQiOiJRTUFHRU5UIn0.cE1p3Iyor3Vc5q0NYTkCj1ZcCtSSLz8zzGNEkX19ePg';
const Home = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalFile, setModalFile] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const fetchSuppliers = async (page = 1, size = 10) => {
    try {
      const response = await fetch(`https://mobile.dev.quadrant-si.id/developertest/Supplier/inquiry/${page}/${size}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'api-version': '1.0',
          'Authorization': TOKEN,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data received:', data); // Log data for debugging
        const suppliersData = data.data.map(supplier => ({
          id: supplier.id,
          name: supplier.name,
          address: supplier.address,
          postCode: supplier.postCode,
        }));
        
        setSuppliers(suppliersData);
      } else {
        const errorText = await response.text();
        console.error('Error fetching suppliers:', response.status, errorText);
        alert('Failed to load suppliers: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers(1, 10); // Fetch the first page with 10 items
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
        <ModalAddFile
        show={modalFile}
        onClose={() => setModalFile(false)}
      />
         <ModalEditFile
        show={modalEdit}
        onClose={() => setModalEdit(false)}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>INVENTORY APPS</Text>
      </View>
      <View style={styles.mainContent}>
        <FlatList
          data={suppliers.slice(0, 10)} // Display only the first 5 items
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setModalEdit(true);
            }} style={styles.personContainer}>
              <View style={styles.personDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.label}>Kode Kurir</Text>
                <Text style={styles.label}>Alamat</Text>
                <Text style={styles.label}>Kode Posko</Text>
              </View>
              <View style={styles.personInfo}>
                <Text style={styles.code}>{item.id}</Text>
                <Text style={styles.address}>{item.address}</Text>
                <Text style={styles.code}>{item.postCode}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={() => {
                setModalFile(true);
              }} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
  },
  header: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxWidth: 480,
  },
  personContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  personDetails: {
    flexDirection: 'column',
    marginLeft: 8,
    maxWidth: 160,
  },
  personInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 8,
    maxWidth: 160,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  label: {
    fontSize: 12,
    color: '#607D8B',
    marginTop: 4,
  },
  code: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#000000',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginVertical: 16,
  },
  addButton: {
    backgroundColor: '#D32F2F',
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Home;