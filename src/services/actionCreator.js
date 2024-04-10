import { HTTP } from "./Http.service";
import jsonToQueryParams from "./jsonToQueryParams";

export function loginUser(params) {
  const url = '/auth/login';
  return new Promise((resolve, reject) => {
    HTTP('post', url, params)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function registerUser(params) {
  const url = '/auth/register';
  return new Promise((resolve, reject) => {
    HTTP('post', url, params)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addEquipment(params) {
  const url = '/equipment/add';
  const headers = { withCredentials: true };
  return new Promise((resolve, reject) => {
    HTTP('post', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getEquipmentByCompanyIdAndSearch(params) {
  let url = '/equipment/getEquipmentByCompanyIdAndSearch';
  url = params ? url + "?" + jsonToQueryParams(params) : url;
  const headers = { withCredentials: true };
  return new Promise((resolve, reject) => {
    HTTP('get', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllAndSearchEquipment(params) {
  let url = '/equipment/getAllAndSearchEquipment';
  const headers = { withCredentials: true };
  url = params ? url + "?" + jsonToQueryParams(params) : url;
  return new Promise((resolve, reject) => {
    HTTP('get', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addToCart(params) {
  const url = '/cart/add-to-cart';
  const headers = { withCredentials: true };
  return new Promise((resolve, reject) => {
    HTTP('post', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getCart(params) {
  let url = '/cart/get-cart';
  const headers = { withCredentials: true };
  url = params ? url + "?" + jsonToQueryParams(params) : url;
  return new Promise((resolve, reject) => {
    HTTP('get', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function deleteItemCart(params) {
  let url = '/cart/remove-from-cart';
  const headers = { withCredentials: true };
  // url = params ? url + "?" + jsonToQueryParams(params) : url;
  return new Promise((resolve, reject) => {
    HTTP('delete', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function editEquipment(params) {
  let url = '/equipment/edit-equipment';
  const headers = { withCredentials: true };
  return new Promise((resolve, reject) => {
    HTTP('put', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function sendRequest(params) {
  const url = '/request/createRequest';
  const headers = { withCredentials: true };
  return new Promise((resolve, reject) => {
    HTTP('post', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getUserRequests(params) {
  let url = '/request/getUserRequests';
  const headers = { withCredentials: true };
  url = params ? url + "?" + jsonToQueryParams(params) : url;
  return new Promise((resolve, reject) => {
    HTTP('get', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getUserOwnedRequests(params) {
  let url = '/request/getUserOwnedRequests';
  const headers = { withCredentials: true };
  url = params ? url + "?" + jsonToQueryParams(params) : url;
  return new Promise((resolve, reject) => {
    HTTP('get', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function manageRequestStatus(params) {
  const url = '/request/manageRequestStatus';
  const headers = { withCredentials: true };
  return new Promise((resolve, reject) => {
    HTTP('post', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function checkOutEquipment(params) {
  const url = '/check-out/check-out-equipment';
  const headers = { withCredentials: true };
  return new Promise((resolve, reject) => {
    HTTP('post', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}


export function deleteEquipment(params) {
  let url = '/equipment/delete-equipment';
  const headers = { withCredentials: true };
  return new Promise((resolve, reject) => {
    HTTP('put', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllUserRequest(params) {
  let url = '/request/getAllUserRequest';
  const headers = { withCredentials: true };
  url = params ? url + "?" + jsonToQueryParams(params) : url;
  return new Promise((resolve, reject) => {
    HTTP('get', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}


export function createPayPalOrder(params) {
  const url = '/paypal/create-order';
  const headers = { withCredentials: true };
  return new Promise((resolve, reject) => {
    HTTP('post', url, params, headers)
      .then((result) => {
        if (result)
          resolve(result.data)
      })
      .catch((error) => {
        reject(error);
      });
  });
}