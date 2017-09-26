import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: 'include',
});

const project = 'father-involvement-challenge';

export const getProject = () => api.get(`bb_projects/projects/${project}`).then(({ data }) => data);

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
    order,
    project,
  };

  // Post the donation
  return api.post('donations/my/', donation).then(({ data }) => data);
});

export default api;
