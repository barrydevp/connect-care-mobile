import axios from "axios";
import * as Log from "./log";
import * as is from "./is";
import { Alert } from "react-native";
// import hash from 'hash.js';

// export default (options, callback) => {
//   return axios(options);
// };

/* const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'The data was deleted successfully.',
  400: 'The request was made with an error and the server did not perform any new or modified data operations.',
  401: 'User does not have permission (token, username, password is incorrect).',
  403: 'The user is authorized, but access is forbidden.',
  404: 'The request is made for a record that does not exist and the server does not operate.',
  406: 'The format of the request is not available.',
  410: 'The requested resource is permanently deleted and will not be retrieved.',
  422: 'A validation error occurred when creating an object.',
  500: 'An error occurred on the server. Please check the server.',
  502: 'Gateway error.',
  503: 'The service is unavailable and the server is temporarily overloaded or maintained.',
  504: 'The gateway timed out.',
}; */

// eslint-disable-next-line arrow-body-style
const checkStatus = response => {
  // console.log("checkStatus response: ", response)

  /* if (response.status === 401) {
    const errortext = "Token hết hạn";
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
  } */

  return response;
  /* if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error; */
};

/* const cachedSave = (response, hashcode) => {
  // *
  //  * Clone a response data and store it in sessionStorage
  //  * Does not support data other than json, Cache only json
  
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
}; */

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
  // console.log(url, option);
  const options = {
    ...option
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */

  const defaultHeaders = {};

  /* const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex'); */

  const defaultOptions = {
    // credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };
  const newOptions = { url, ...defaultOptions, ...options };
  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    if (is.object(newOptions.body)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers
      };
      newOptions.data = JSON.stringify(newOptions.body);
    }
  }
  // console.log("newOptions", newOptions);
  // const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  /* if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  } */
  // console.log("url: %o , newOptions:%o, ", url, newOptions)
  return (
    axios(newOptions)
      .then(checkStatus)
      // .then(response => cachedSave(response, hashcode))
      // eslint-disable-next-line arrow-body-style
      .then(response => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        /* if (newOptions.method === 'DELETE' || response.status === 204) {

        return response.text();
      } */
        return response.data;
      })
      .catch(e => {
        const status = e.name;
        console.log("catch request window: ", e);

        Alert && Alert.alert(`Có lỗi xảy ra: `, "Lỗi kết nối hệ thống...");
        throw e;
        // environment should not be used
        /* if (status === 403) {
        router.push('/exception/403', '/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/exception/500', '/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/exception/404', '/exception/404');
      } */
      })
  );
}
