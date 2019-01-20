import AscentTypes from '../model/AscentTypes'

export const getAscentTypeById = (id = 0) =>
    [AscentTypes.ROUTES, AscentTypes.BOULDERS, AscentTypes.MULTI_PITCH][id];

export const getAscentTypeId = shorthand =>
    ({
        routes: 0,
        boulders: 1,
        "multi-pitch": 2
    }[shorthand]);
