import { getNamesArrayFromBitMask } from "./bitmaskUtils";
import {AscentMethodMap} from "../model/AscentMethods";
import AscentNotes from "../model/AscentNotes";
import { getAscentTypeById } from "./ascentUtils";
import AscentGrades, { AscentGradeMapping } from "../model/AscentGrades";

const transformAscents = ascents => ascents
  // skip database additions that are not ascents
  .filter(a => a.dbascent === "false")
  .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
  .map(ascent => {
    ascent.type = getAscentTypeById(ascent.type);

    // set attempt methods
    if (ascent.objectclass === "CLS_UserAscent_Try" || ascent.note & AscentNotes.NOTE_ONE_HANG) {
      ascent.style = "6"
    }

    // style = redpoint, flash etc. I call this 'method'.
    ascent.method = AscentMethodMap[ascent.style];
    if(!ascent.method) {
      console.error('method not found', ascent.style, ascent)
      return false
    }

    // transform gradeId
    const newGradeId = AscentGradeMapping[ascent.grade];
    if (!newGradeId) {
      console.error("gradeId not found", ascent.grade);
    }
    ascent.grade = AscentGrades[newGradeId];
    ascent.note = parseInt(ascent.note, 10)
    if(ascent.note === 0) {
      ascent.note = AscentNotes.Other.value
    }

    return ascent;
  }).filter(ascent => ascent)

export default transformAscents;