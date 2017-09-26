import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: 'include',
});

export const getOrder = id => api.get(`orders/my/${id}`).then(({ data }) => data);

export const getProject = slug => api.get(`bb_projects/projects/${slug}`).then(({ data }) => data);

export const postDonation = (amount, slug) => api.post('orders/my/').then((response) => {
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
    project: slug,
  };

  // Post the donation
  return api.post('donations/my/', donation).then(({ data }) => data);
});

export const postOrderPayment = (method, order) => {
  const orderPayment = {
    integration_data: {
      default_pm: 'ideal',
      ideal_issuer_id: method,
    },
    order,
    payment_method: 'docdataIdeal',
  };

  return api.post('order_payments/my/', orderPayment).then(({ data }) => data);
};

export default api;
