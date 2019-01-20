import { getNamesArrayFromBitMask } from "./bitmaskUtils";
import AscentMethods, {AscentMethodMap} from "../model/AscentMethods";
import AscentNotes from "../model/AscentNotes";
import { getAscentTypeById } from "./ascentUtils";
import { AscentGradeMapping, AscentGrades } from "../model/AscentGrades";

const transformAscents = ascents => ascents
  // skip database additions that are not ascents
  .filter(a => a.dbascent === "false")
  .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
  .map(ascent => {
    ascent.type = getAscentTypeById(ascent.type);

    // set attempt methods
    if (ascent.objectclass === "CLS_UserAscent_Try") {
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
    
    // 2nd go, firt ascent etc
    ascent.notes = getNamesArrayFromBitMask(AscentNotes, ascent.note);

    return ascent;
  }).filter(ascent => ascent)

export default transformAscents;