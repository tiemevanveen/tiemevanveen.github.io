export const getAscents = userId => {
  try {
    return JSON.parse(window.localStorage.getItem(`raw-ascents-${userId}`));
  } catch (ex) { }
}

export const saveAscents = (userId, ascents) => {
  try {
    return window.localStorage.setItem(`raw-ascents-${userId}`, JSON.stringify(ascents));
  } catch (ex) { }
}

export const clearCache = () => {
  try {
    window.localStorage.clear();
  } catch (ex) { }
}