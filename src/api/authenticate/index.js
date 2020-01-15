import { request, _ENV } from "~/utils";

export function login(body) {
  return request(`${_ENV.API_ENDPOINT}/authenticate`, {
    method: "POST",
    body
  });
}

export function verify(params) {
  return request(`${_ENV.API_ENDPOINT}/verify`, {
    method: "POST",
    body: params
  });
}
