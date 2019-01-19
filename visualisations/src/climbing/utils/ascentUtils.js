import {AscentTypes} from '../model/AscentTypes'

export const getAscentTypeById = (id = 0) =>
    [AscentTypes.ROUTES, AscentTypes.BOULDERS, AscentTypes.MULTI_PITCH][id];

export const getAscentTypeId = shorthand =>
    ({
        routes: 0,
        boulders: 1,
        "multi-pitch": 2
    }[shorthand]);

export const isRoute = shorthand => {
    if (process.env.NODE_ENV !== "production") {
        if (typeof shorthand !== "string") {
            console.error("isRoute is not called with string", shorthand);
        }
    }

    return shorthand === AscentTypes.ROUTES.shorthand;
};

export const isBoulder = shorthand => {
    if (process.env.NODE_ENV !== "production") {
        if (typeof shorthand !== "string") {
            console.error("isBoulder is not called with string", shorthand);
        }
    }

    return shorthand === AscentTypes.BOULDERS.shorthand;
};
