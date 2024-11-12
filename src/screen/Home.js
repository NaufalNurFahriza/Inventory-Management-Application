import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export const BASE_URL = 'https://mobile.dev.quadrant-si.id/developertest/api/docs/';
export const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMWY2MTIyMS02MTYwLTQwZjQtYTRlNS1hYjc0YjhkMTg5OTciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJzdWIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbInNlYy5leHQuYyIsInNlYy5leHQuZCIsInNlYy5leHQudSIsInNlYy5leHQudiIsInNlYy5tb2QuYyIsInNlYy5tb2QuZCIsInNlYy5tb2QudSIsInNlYy5tb2QudiIsInNlYy5wZXIuYyIsInNlYy5wZXIuZCIsInNlYy5wZXIudSIsInNlYy5wZXIudiIsInNlYy5yb2wuYyIsInNlYy5yb2wuZCIsInNlYy5yb2wudSIsInNlYy5yb2wudiIsInNlYy51c2UuYyIsInNlYy51c2UuZCIsInNlYy51c2UudSIsInNlYy51c2UudiJdLCJwZXJtaXNzaW9uIjpbInNlYy5leHQuYyIsInNlYy5leHQuZCIsInNlYy5leHQudSIsInNlYy5leHQudiIsInNlYy5tb2QuYyIsInNlYy5tb2QuZCIsInNlYy5tb2QudSIsInNlYy5tb2QudiIsInNlYy5wZXIuYyIsInNlYy5wZXIuZCIsInNlYy5wZXIudSIsInNlYy5wZXIudiIsInNlYy5yb2wuYyIsInNlYy5yb2wuZCIsInNlYy5yb2wudSIsInNlYy5yb2wudiIsInNlYy51c2UuYyIsInNlYy51c2UuZCIsInNlYy51c2UudSIsInNlYy51c2UudiJdLCJyb2xlIjpbIi0iLCJTdXBlciBBZG1pbiJdLCJleHAiOjE3MzE0NTU1MDYsImlzcyI6Imh0dHBzOi8vbW9iaWxlLmRldi5xdWFkcmFudC1zaS5pZC9hZ2VudGRldi8iLCJhdWQiOiJRTUFHRU5UIn0.BpAoTTzV0qxr6PxxHs393bENco0NnU9oXLPIsK1lBPg';

const Home = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log('Data received:', data); // Log data untuk memastikan respons valid
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
    fetchSuppliers(2, 1); // Panggil halaman dan ukuran yang diperlukan
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Hello</Text>
      <FlatList
        data={suppliers.slice(0, 5)} // Menampilkan hanya 5 data pertama
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Text>ID Kurir: {item.id}</Text>
            <Text>Nama Kurir: {item.name}</Text>
            <Text>Kode Posko: {item.postCode}</Text>
            <Text>Alamat: {item.address}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Home;