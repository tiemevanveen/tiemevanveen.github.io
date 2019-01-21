import AscentTypes from './AscentTypes'

const AscentNotes = {
    NOTE_FA: {
        label: "First Ascent",
        value: 1,
        score: {
            routes: 30, // was 10 once
            boulders: 20 // was 5 once..
        },
        ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand],
    },
    NOTE_2ND_GO: {
        label: "Second Go",
        value: 2,
        score: {
            routes: 2,
            boulders: 2
        },
        ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand],
    },
    NOTE_TRAD: {
        label: "Trad",
        value: 4,
        score: {
            routes: 30,
            boulders: 0
        },
        ascentTypes: [AscentTypes.ROUTES.shorthand],
    },
    NOTE_SOFT: {
        label: "Soft",
        value: 8,
        score: {
            routes: 0,
            boulders: 0
        },
        ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand],
    },
    NOTE_HARD: {
        label: "Hard",
        value: 16,
        score: {
            routes: 0,
            boulders: 0
        },
        ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand],
    },
    NOTE_TRAV: {
        label: "Traverse",
        value: 32,
        score: {
            routes: 0,
            boulders: 0
        },
        ascentTypes: [AscentTypes.BOULDERS.shorthand],
    },
    NOTE_ONE_HANG: {
        label: "One Hang",
        value: 64,
        score: {
            routes: -128,
            boulders: 0
        },
        ascentTypes: [AscentTypes.ROUTES.shorthand],
    },
    Other: {
        label: "Other",
        value: 128,
        score: {
            routes: 0,
            boulders: 0
        },
        ascentTypes: [AscentTypes.ROUTES.shorthand, AscentTypes.BOULDERS.shorthand],
    }
};

export default AscentNotes;
