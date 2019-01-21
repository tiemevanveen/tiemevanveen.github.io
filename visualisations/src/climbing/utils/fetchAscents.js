import { fetch } from 'whatwg-fetch'
import xml2js from "xml2js";

import * as localStorage from './localStorage'

const fetchAscents = async (userId, ascentTypeShortHand) => {
  let text = localStorage.getAscents(userId, ascentTypeShortHand);
  if (text) {
    return {
      fromCache: true,
      ascents: await promiseParseXml(text),
    }
  }

  const url = `https://cors-anywhere.herokuapp.com/https://www.8a.nu/scorecard/xml/${userId}_${ascentTypeShortHand}.xml`;
  console.info('fetch', url)
  const response = await fetch(url);
  text = await response.text();
  localStorage.saveAscents(userId, ascentTypeShortHand, text);

  return {
    fromCache: false,
    ascents: await promiseParseXml(text),
  }
}

const promiseParseXml = text =>
  new Promise((resolve, reject) =>
    new xml2js.Parser({ normalizeTags: true, explicitArray: false })
      .parseString(text, (err, json) => {
        if(err){
          return reject(err)
        }
        
        if(!json.ascentlist.ascent) {
          return reject(new Error("Loading ascents failed..."));
        }

        console.log('parsed JSON', json)
        return resolve(json.ascentlist.ascent)
      })
  );

export default fetchAscents;