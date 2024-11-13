import axios from 'axios';

const fetchData = async () => {
  const url = 'https://mobile.dev.quadrant-si.id/developertest/api/docs/'; // Ganti dengan endpoint yang sesuai
  const token = 'YOUR_BEARER_TOKEN_HERE'; // Ganti dengan token yang valid

  const payload = {
    // Tambahkan data yang perlu dikirimkan di sini jika diperlukan
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Menambahkan header Authorization
      },
    });

    // Mengambil token dari respons
    const { token: newToken, tokenRefresh } = response.data;
    console.log('Token:', newToken);
    console.log('Token Refresh:', tokenRefresh);
    
    // Lakukan sesuatu dengan token di sini

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default fetchData;