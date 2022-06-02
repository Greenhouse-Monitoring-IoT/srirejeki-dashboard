const endpoint = "http://20.124.124.81/";

function getToken() {
  const token = localStorage.getItem("token");
  return String(token);
}
function removeBearer() {
  localStorage.removeItem("token");
}

export async function getData(url, isAuth) {
  let headers = {};
  if (isAuth) {
    headers.Authorization = "Bearer " + getToken();
  }
  try {
    const getReturn = await fetch(endpoint + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    if (getReturn.status === 401) {
      removeBearer();
      return { isSuccess: false, status: null, data: null };
    }
    return {
      isSuccess: true,
      status: getReturn.status,
      data: (await getReturn.json()).payload,
    };
  } catch (e) {
    console.log(e);
  }
  return { isSuccess: false, status: null, data: null };
}

export async function postData(url, isAuth, field) {
  let headers = {};
  if (isAuth) {
    headers.Authorization = "Bearer " + getToken();
  }
  try {
    const getReturn = await fetch(endpoint + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(field),
    });
    if (getReturn.status === 401) {
      removeBearer();
      return { isSuccess: false, status: null, data: null };
    }
    return {
      isSuccess: true,
      status: getReturn.status,
      data: (await getReturn.json()).payload,
    };
  } catch (e) {
    console.log(e);
  }
  return { isSuccess: false, status: null, data: null };
}
