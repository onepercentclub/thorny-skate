const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://thorn-skate.dokku.onepercentclub.com/#/'
  : 'http://localhost:8080/#/';

export const getAuthorizationUrl = (dirtyUrl, order) => {
  const url = new URL(dirtyUrl);

  url.searchParams.set('return_url_canceled', `${apiUrl}canceled?order=${order}`);
  url.searchParams.set('return_url_error', `${apiUrl}error?order=${order}`);
  url.searchParams.set('return_url_pending', `${apiUrl}pending?order=${order}`);
  url.searchParams.set('return_url_success', `${apiUrl}success?order=${order}`);

  return url.href;
};

export default {
  getAuthorizationUrl,
};
