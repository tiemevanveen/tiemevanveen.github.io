import AscentTypes from "./AscentTypes";

const AscentMethods = {
  0: {
    id: 0,
    oldId: "5 or 3",
    key: 3,
    value: { routes: 145, boulders: 95 },
    shorthand: "onsight",
    label: "Onsight",
    ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand]
  },
  1: {
    id: 2,
    oldId: "2",
    key: 2,
    value: { routes: 53, boulders: 53 },
    shorthand: "flash",
    label: "Flash",
    ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand]
  },
  2: {
    id: 1,
    oldId: "1",
    key: 1,
    value: { routes: 0, boulders: 0 },
    shorthand: "redpoint",
    label: "Redpoint",
    ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand]
  },
  3: {
    id: 3,
    oldId: "4",
    key: 4,
    value: { routes: -52, boulders: -52 },
    shorthand: "toprope",
    label: "Toprope",
    ascentTypes: [AscentTypes.ROUTES.shorthand]
  },
  4: {
    id: 4,
    oldId: "no method",
    key: 6,
    value: { routes: 0, boulders: 0 },
    shorthand: "attempt",
    label: "Attempt",
    ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand]
  }
};

export const AscentMethodMap = {
  1: AscentMethods[2],
  2: AscentMethods[1],
  3: AscentMethods[0],
  4: AscentMethods[3],
  5: AscentMethods[0],
  6: AscentMethods[4],
};

export const AscentMethodShortHands = [
  "onsight",
  "flash",
  "redpoint",
  "toprope"
];

export default AscentMethods;
