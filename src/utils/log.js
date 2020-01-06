const handle = {
  warn: text => console.warn(text),
  log: text => console.log(text),
  error: text => console.error(text)
};

const doNotThing = () => {};

const createLog = isDev => {
  return handle.map(han => (isDev ? han : doNotThing));
};

export default createLog(true);
