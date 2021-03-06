import { request, _ENV, _, is } from "~/utils";

export function putUser(id, headers, body) {
  return request(`${_ENV.API_SERVER}/users/${id}`, {
    method: "PUT",
    headers,
    body
  })
}

export function currentUser(token) {
  return request(`${_ENV.API_SERVER}/currentUser`, {
    method: "GET",
    headers: {
      "X-Auth-Key": token
    }
  }).then(data => {
    // console.log(data);
      if (!_.isEmpty(data)){
        if(!is.undef(data.success) && !data.success) {
          throw data;
        }
        return {
          ..._.omit(data, ["isLienThong", "password"]),
          places:
            (is.array(data.places) &&
              data.places.map(e =>
                _.omit(e, [
                  "groupPlacesId",
                  "passwordOfPlace",
                  "placesUsers",
                  "usernameOfPlace"
                ])
              )) ||
            []
        };
      }
  });
}

export function auth_routes(token, params) {
  return request(`${_ENV.API_SERVER}/auth_routes`, {
    method: "GET",
    headers: {
      "X-Auth-Key": token
    },
    params
  });
}

export function changePass(id, headers, body) {
  return request(`${_ENV.API_SERVER}/userspass/changepass/${id}`, {
    method: "POST",
    headers,
    body
  })
}
