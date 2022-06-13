//IP Address server yang digunakan
const endpoint = "http://20.124.124.81/";

//Fungsi ini digunakan untuk mendapatkan token yang tersimpan pada local storage web
function getToken() {
  const token = localStorage.getItem("token");
  return String(token);
}

//Fungsi ini untuk menghapus token bearer autentikasi yang tersimpan di dalam local storage
function removeBearer() {
  localStorage.removeItem("token");
}

//Fungsi ini merupakan fungsi yang akan dijalankan secara asinkron dengan tujuan mendapatkan data dari endpoint atau server
//Fungsi ini akan memberikan return berupa object javascript yang merupakan respon dari server
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

//Fungsi ini merupakan fungsi yang akan dijalankan secara asinkron dengan tujuan mengirim data dari endpoint atau server.
//Fungsi ini akan memberikan return berupa object javascript yang merupakan respon dari server
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
