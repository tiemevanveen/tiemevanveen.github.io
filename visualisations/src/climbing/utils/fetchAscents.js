import { fetch } from 'whatwg-fetch'
import xml2js from "xml2js";

import * as localStorage from './localStorage'

const fetchAscents = async userId => {
  let text = localStorage.getAscents(userId);
  if (text) {
    return await promiseParseXml(text);
  }

  const url = `https://cors-anywhere.herokuapp.com/https://www.8a.nu/scorecard/xml/${userId}_routes.xml`;
  console.info('fetch', url)
  const response = await fetch(url);
  text = await response.text();
  localStorage.saveAscents(userId, text);

  return await promiseParseXml(text);
}

const promiseParseXml = text =>
  new Promise((resolve, reject) =>
    new xml2js.Parser({ normalizeTags: true, explicitArray: false })
      .parseString(text, (err, json) => {
        if(err){
          return reject(err)
        }
        
        console.log('json', json)
        console.log('json.ascentlist.ascent', json && json.ascentlist && json.ascentlist.ascent)
        return resolve(json.ascentlist.ascent)
      })
  );

export default fetchAscents;