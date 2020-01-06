import validator from "validator";

const isUsername = (username) => {
  return validator.matches(username, /\w{6,50}/)
}

const isPassword = (password) => {
  return validator.matches(password, /.{6,100}/i)
}

export default {
  ...validator,
  isUsername,
  isPassword
};
