import invariant from "invariant";
import warning from "warning";

export const warn = text => warning(true, text);
export const log = text => console.log(text);
export const error = text => invariant(true, text);

export {
  warning,
  invariant
}
