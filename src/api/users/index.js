import { request, _ENV, _, is } from "~/utils";

export function currentUser(token) {
  return request(`${_ENV.API_SERVER}/currentUser`, {
    method: "GET",
    headers: {
      "X-Auth-Key": token
    }
  }).then(data => {
    if (!_.isEmpty(data))
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

    return;
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
