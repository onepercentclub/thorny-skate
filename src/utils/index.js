export const getAuthorizationUrl = (dirtyUrl, order) => {
  const url = new URL(dirtyUrl);

  url.searchParams.set('return_url_canceled', `http://localhost:8080/#/canceled?order=${order}`);
  url.searchParams.set('return_url_error', `http://localhost:8080/#/error?order=${order}`);
  url.searchParams.set('return_url_pending', `http://localhost:8080/#/pending?order=${order}`);
  url.searchParams.set('return_url_success', `http://localhost:8080/#/success?order=${order}`);

  return url.href;
};

export default {
  getAuthorizationUrl,
};
