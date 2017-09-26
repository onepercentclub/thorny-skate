import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: 'include',
});

export const postDonation = amount => api.post('orders/my/').then((response) => {
  // Get the order id
  const { data: { id: order } } = response;

  // Create the donation
  const donation = {
    amount: {
      amount,
      currency: 'EUR',
    },
    anonymous: true,
    name: '',
    order,
    project: 'father-involvement-challenge',
  };

  // Post the donation
  api.post('donations/my/', donation).then((result) => {
    console.log(result);
  });
});

export default api;
