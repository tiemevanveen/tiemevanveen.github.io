import { fetch } from 'whatwg-fetch'
import xml2js from "xml2js";

import * as localStorage from './localStorage'

const promiseParseXml = text =>
  new Promise((resolve, reject) =>
    new xml2js.Parser({ normalizeTags: true })
      .parseString(text, (err, json) => err ? reject(err) : resolve(json))
  );

const fetchAscents = async userId => {
  let ascents = localStorage.getAscents(userId);
  if (ascents) {
    return ascents;
  }

  const url = `https://cors-anywhere.herokuapp.com/https://www.8a.nu/scorecard/xml/${userId}_routes.xml`;
  console.info('fetch', url)
  const response = await fetch(url);
  const text = await response.text();
  ascents = await promiseParseXml(text).ascentlist.ascent;

  localStorage.saveAscents(userId, ascents);

  return ascents
};

export default fetchAscents;