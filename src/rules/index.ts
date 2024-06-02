import mightThrow from "./might-throw/might-throw";
import noUnhandled from "./no-unhandled/no-unhandled";
import useErrorCause from "./use-error-cause/use-error-cause";

export const rules = {
  [noUnhandled.name]: noUnhandled.rule,
  [mightThrow.name]: mightThrow.rule,
  [useErrorCause.name]: useErrorCause.rule,
};
