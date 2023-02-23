import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('https://fe.dev.dxtr.asia/api/products');
  return response.data;
};
