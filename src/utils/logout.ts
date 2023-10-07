// logout.ts

import { easyFetch } from './submit';

const logout = async () => {
  try {
    const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;
    const res = await easyFetch(
      'POST',
      new URL(apiUrl+'/auth/logout')
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    location.reload();
    return data;
  } catch (error) {
    throw error;
  }
};

export { logout };