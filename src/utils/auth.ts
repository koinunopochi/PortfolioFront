// logout.ts

import { easyFetch, refresh } from './submit';

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

const isLogin = async () => {
  try {
    await refresh();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { isLogin };