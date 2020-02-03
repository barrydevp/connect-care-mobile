import memoizeOne from "memoize-one";
import Validator from "./validator";
import * as is from "./is";

export const getCaptionAndStatusOfInput = memoizeOne((type, value) => {
  let isValidate = false;
  if (is.string(type)) isValidate = is.undef(value) || Validator[type](value);
  else if (is.func(type)) isValidate = type(value);
  else isValidate = !!type;
  return memoizeOne((caption, status) => {
    return {
      caption: isValidate ? caption.success : caption.error,
      status: isValidate ? status.success : status.error,
      isValidate
    };
  });
});
