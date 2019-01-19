import { getNamesArrayFromBitMask } from "./bitmaskUtils";
import { AscentMethods } from "../model/AscentMethods";
import { AscentNotes } from "../model/AscentNotes";
import { getAscentTypeById } from "./ascentUtils";
import { AscentGradeMapping, AscentGrades } from "../model/AscentGrades";

const transformAscents = ascents => ascents
  .filter(a => a.dbascent === "false")
  .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
  .map(ascent => {
    ascent.notes = getNamesArrayFromBitMask(AscentNotes, ascent.note);
    ascent.method = AscentMethods[ascent.style];
    ascent.type = getAscentTypeById(ascent.type);

    if (ascent.objectclass === "CLS_UserAscent_Try") {
      ascent.isTry = true;
    }

    const newGradeId = AscentGradeMapping[ascent.grade];
    if (!newGradeId) {
      console.error("gradeId not found", ascent.grade);
    }
    ascent.grade = AscentGrades[newGradeId];
    return ascent;
  });

export default transformAscents;