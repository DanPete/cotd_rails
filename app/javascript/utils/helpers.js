function csrfToken(document) {
  return document.querySelector('[name="csrf-token"]').content;
}

export function passCsrfToken(document, axios) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken(document);
}

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
