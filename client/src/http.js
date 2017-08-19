/**
 * thin wrappers over fetch.
 */

export function get(url) {
  const init = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  addAuth(init);
  return fetch(url, init);
}

export function post(url, body) {
  const init = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  addAuth(init);
  return fetch(url, init);
}

export function put(url, body) {
  const init = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  addAuth(init);
  return fetch(url, init);
}

export function del(url) {
  const init = {
    method: 'DELETE',
    headers: {}
  };
  addAuth(init);
  return fetch(url, init);
}

function addAuth(init) {
  const token = window.sessionStorage.getItem('token');
  if (token) {
    init.headers.Authorization = `Bearer ${token}`;
  }
}
