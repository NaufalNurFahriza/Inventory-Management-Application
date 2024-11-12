import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

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
          // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Jika perlu
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
          email: supplier.contacts.find(contact => contact.contactType === 'email')?.value || 'N/A',
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
      <FlatList
        data={suppliers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Text>ID Kurir: {item.id}</Text>
            <Text>Nama Kurir: {item.name}</Text>
            <Text>Kode Posko: {item.postCode}</Text>
            <Text>Email: {item.email || 'N/A'}</Text>
            <Text>Alamat: {item.address}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Home;
