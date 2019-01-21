import AscentTypes from "./AscentTypes";

const AscentMethods = {
  ONSIGHT: {
    id: 0,
    oldId: "5 or 3",
    value: { routes: 145, boulders: 95 },
    shorthand: "onsight",
    label: "Onsight",
    ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand]
  },
  FLASH: {
    id: 1,
    oldId: "2",
    value: { routes: 53, boulders: 53 },
    shorthand: "flash",
    label: "Flash",
    ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand]
  },
  REDPOINT: {
    id: 2,
    oldId: "1",
    value: { routes: 0, boulders: 0 },
    shorthand: "redpoint",
    label: "Redpoint",
    ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand]
  },
  TOPROPE: {
    id: 3,
    oldId: "4",
    value: { routes: -52, boulders: -52 },
    shorthand: "toprope",
    label: "Toprope",
    ascentTypes: [AscentTypes.ROUTES.shorthand]
  },
  ATTEMPT: {
    id: 4,
    oldId: "no method",
    value: { routes: 0, boulders: 0 },
    shorthand: "attempt",
    label: "Attempt",
    ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand]
  }
};

export const AscentMethodMap = {
  1: AscentMethods.REDPOINT,
  2: AscentMethods.FLASH,
  3: AscentMethods.ONSIGHT,
  4: AscentMethods.TOPROPE,
  5: AscentMethods.ONSIGHT,
  6: AscentMethods.ATTEMPT,
};

export default AscentMethods;
