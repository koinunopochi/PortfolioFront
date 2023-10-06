// logout.ts

import { easyFetch } from './submit';

const logout = async () => {
  try {
    const res = await easyFetch(
      'POST',
      new URL('/auth/logout', import.meta.env.VITE_APP_API_DOMAIN)
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