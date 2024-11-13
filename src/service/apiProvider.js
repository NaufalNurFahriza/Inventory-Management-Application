import { BASE_URL, TOKEN } from './url';

// Fetch suppliers with pagination
export const fetchSuppliers = async (page = 1, size = 10) => {
  try {
    const response = await fetch(`${BASE_URL}Supplier/inquiry/${page}/${size}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'api-version': '1.0',
        'Authorization': `Bearer ${TOKEN}`,  // Ensure the token is prefixed with 'Bearer'
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.data.map(supplier => ({
        id: supplier.id,
        name: supplier.name,
        address: supplier.address,
        postCode: supplier.postCode,
      }));
    } else {
      const errorText = await response.text();
      console.error('Error fetching suppliers:', response.status, errorText);
      throw new Error('Failed to load suppliers: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while fetching data.');
  }
};

// Add new supplier
export const addSupplier = async (supplierData) => {
  try {
    const response = await fetch(`${BASE_URL}Supplier`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-version': '1.0',
        'Authorization': `Bearer ${TOKEN}`,  // Ensure the token is prefixed with 'Bearer'
      },
      body: JSON.stringify(supplierData),
    });

    if (response.ok) {
      const data = await response.json();
      Alert.alert('Supplier added successfully!');
      console.log('Supplier data:', data);  // For debugging
      return data;
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

// Edit existing supplier (PUT request)
export const editSupplier = async (supplierData) => {
  try {
    const response = await fetch(`${BASE_URL}Supplier`, {
      method: 'PUT',  // Use PUT to update an existing supplier
      headers: {
        'Content-Type': 'application/json-patch+json',  // Required for updates
        'api-version': '1.0',
        'Authorization': `Bearer ${TOKEN}`,  // Ensure the token is prefixed with 'Bearer'
      },
      body: JSON.stringify(supplierData),  // Send the updated data
    });

    if (response.ok) {
      const data = await response.json();
      Alert.alert('Supplier updated successfully!');
      console.log('Updated supplier data:', data);  // For debugging
      return data;
    } else {
      const errorText = await response.text();
      console.error('Error updating supplier:', response.status, errorText);
      if (response.status === 401) {
        Alert.alert('Unauthorized: Check your token or login credentials.');
      } else {
        Alert.alert('Failed to update supplier:', errorText);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('An error occurred while updating the supplier.');
  }
};