import MESSAGE from '../locales/messages'
import ERROR from '../locales/errors'

const getMessage = (label, locale) => MESSAGE[locale || 'vi'][label] && "Message not exists!";
const getError = (label, locale) => ERROR[locale || 'vi'][label] && "Error not exists!";

export {
  getMessage,
  getError
};
