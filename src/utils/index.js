export const getAuthorizationUrl = (dirtyUrl, order, slug) => {
  const url = new URL(dirtyUrl);

  url.searchParams.set('return_url_canceled', `http://localhost:8080/#/canceled?order=${order}&slug=${slug}`);
  url.searchParams.set('return_url_error', `http://localhost:8080/#/error?order=${order}&slug=${slug}`);
  url.searchParams.set('return_url_pending', `http://localhost:8080/#/pending?order=${order}&slug=${slug}`);
  url.searchParams.set('return_url_success', `http://localhost:8080/#/success?order=${order}&slug=${slug}`);

  return url.href;
};

export default {
  getAuthorizationUrl,
};
