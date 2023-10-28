export const fetcher = (url: string) =>
  fetch(`/api${url}`, { mode: 'cors' }).then((res) => res.json());
