export const getAscents = (userId, ascentTypeShortHand) => {
  try {
    return JSON.parse(window.localStorage.getItem(`raw-${ascentTypeShortHand}-${userId}`));
  } catch (ex) { }
}

export const saveAscents = (userId, ascentTypeShortHand, ascents) => {
  try {
    return window.localStorage.setItem(`raw-${ascentTypeShortHand}-${userId}`, JSON.stringify(ascents));
  } catch (ex) { }
}

export const clearCache = () => {
  try {
    window.localStorage.clear();
  } catch (ex) { }
}