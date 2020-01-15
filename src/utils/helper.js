import memoizeOne from "memoize-one";
import Validator from "./validator";
import * as is from "./is";

export const getCaptionAndStatusOfInput = memoizeOne((type, value) => {
  const isValidate = is.undef(value) || Validator[type](value);
  return memoizeOne((caption, status) => {
    return {
      caption: isValidate ? caption.success : caption.error,
      status: isValidate ? status.success : status.error,
      isValidate
    };
  });
});
