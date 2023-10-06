import { easyFetch } from './submit';

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;
const isAdmin = async(): Promise<boolean> => {
  const res = await easyFetch('GET', new URL(apiUrl + '/auth/is-admin'));
  const response = await res.json();
  return response.is_admin;
};
export { isAdmin };