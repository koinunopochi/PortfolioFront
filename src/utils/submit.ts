const refresh = async () => {
  const res = await fetchRefresh();
  console.log(res);
  if (!res) {
    throw new Error('refresh failed');
  }
  return true;
};

export { refresh };

const fetchRefresh = async () => {
  const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;
  try {
    const res = await fetch(apiUrl + '/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({}),
    });
    if (res.status == 401 || res.status == 403) {
      throw new Error(res.status.toString());
    }
    return res;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

const easyFetch: (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: URL,
  data?: Record<string, unknown>,
  i?: number
) => Promise<Response> = async (method, url, data = {}, i = 0) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    };

    if (method === 'POST' || method === 'PUT') {
      options.body = JSON.stringify(data);
    }
    console.log(options);

    const response = await fetch(url.toString(), options);

    if (
      response.status == 401 ||
      response.status == 403 ||
      response.status == 400
    ) {
      throw new Error(response.status.toString());
    }
    if (!response.ok) {
      console.log('call', response);
      throw new Error(response.statusText);
    }
    return response;
  } catch (error: any) {
    if (i == 1) {
      throw error;
    }
    if (
      error.message == '400' ||
      error.message == '401' ||
      error.message == '403'
    ) {
      await refresh();
      return await easyFetch(method, url, data, 1);
    }
    // console.error(error);
    throw error;
  }
};

export { easyFetch };
