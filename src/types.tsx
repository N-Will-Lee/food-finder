export type Restaurant = {
    [key: string]: any,
    id: string,
    name: string,
    address1: string,
    city: string,
    state: string,
    zip: number,
    lat: number,
    long: number,
    telephone: string,
    tags: string,
    website: string,
    genre: string,
    hours: string,
    attire: string
};

export type FilterOptions = {
    [key: string]: any,
    genres: string[],
    states: string[],
    tags: string[]
};

export type FilterOptionsActions = {
    filterType: string,
    filtersPayload: string
}

export type Filter = {
    type: string,
    value: string
}

export type FilterActions = {
    modification: string,
    filterPayload: Filter
}
